const express = require("express");
const { User, Todos } = require("../../models");
const router = express.Router();

//Todo Api
router.post("/add-todo", async (req, res) => {
  const { name, is_completed, userId } = req.body;
  if (!userId) return res.status(404).send("Todo is missing userId");
  try {
    const todo = await Todos.create({ name, is_completed, userId: userId });
    return res.json(todo);
  } catch (error) {
    res.json(error);
  }
});
//Get Todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todos.findAll({ include: "User" });
    return res.json(todos);
  } catch (error) {
    res.sendStatus(500).json(error);
  }
});
//Edit Todos
router.put("/edit-todo", async (req, res) => {
  const { id } = req.query;
  const { name, is_completed, userId } = req.body;
  try {
    //To Update the specific Todo
    await Todos.update(
      { name, is_completed },
      {
        where: {
          id,
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
