const express = require("express");
const { SubTodo } = require("../../models");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, done, description, parentId } = req.body;
    const { userId } = req.user;
    if (!name || !done || !description || !parentId) {
      return res.status(403).send("Please send name done description parentId");
    }
    if (!userId) return res.status(403).send("You are unauthorized.");

    const subTodo = await SubTodo.create({ name, done, description, parentId });
    return res.json(subTodo);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
