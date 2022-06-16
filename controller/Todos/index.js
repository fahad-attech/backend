const express = require("express");
const { User, Todos, Sequelize, SubTodo } = require("../../models");
const router = express.Router();

//Todo Api
router.post("/", async (req, res) => {
  try {
    const { name, is_completed } = req.body;
    const { userId } = req.user;

    if (!userId) return res.status(403).send("You are unauthorized.");

    const todo = await Todos.create({ name, is_completed, userId });
    return res.json(todo);
  } catch (error) {
    res.json(error);
  }
});
//Get Todos
router.get("/", async (req, res) => {
  try {
    //got user from middleware
    console.log(req.user);
    const { page = 0, perPage = 10, name = "" } = req.query;
    const offset = page * perPage;
    const { userId } = req.user;
    const todos = await Todos.findAndCountAll({
      offset,
      limit: perPage,
      where: {
        userId,
        name: {
          [Sequelize.Op.like]: `%${name}%`,
        },
      },
      include: [
        {
          model: SubTodo,
          attributes: { exclude: ["parentId", "createdAt", "updatedAt"] },
        },
        { model: User, attributes: [] },
      ],
    });
    return res.json(todos);
  } catch (error) {
    res.sendStatus(500).json(error);
  }
});
//Edit Todos
router.put("/", async (req, res) => {
  try {
    const { id } = req.query;
    const { name, is_completed } = req.body;
    const { userId } = req.user;
    //To Update the specific Todo
    await Todos.update(
      { name, is_completed },
      {
        where: {
          id,
          userId,
        },
      }
    );
    //Fetch the updated Todo and return it
    const updatedTodo = await Todos.findOne({
      where: {
        id,
      },
    });
    return res.json(updatedTodo);
  } catch (error) {
    return res.sendStatus(500).json(error);
  }
});

module.exports = router;
