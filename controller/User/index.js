const express = require("express");
const { User, Todos } = require("../../models");
const router = express.Router();

//user is prepended route Name
router
  .route("/")
  .get(async (req, res) => {
    //get all the users list
    const users = await User.findAll();
    res.json(users);
  })
  .post(async (req, res) => {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({ name, email, password, role });
    res.json(newUser);
  })
  .put((req, res) => {
    res.send("Put Route");
  })
  .delete((req, res) => {
    res.send("Delete Route");
  });

module.exports = router;
