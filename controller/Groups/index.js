const express = require("express");
const router = express.Router();
const { Group } = require("../../models");

//Route for Roles

router
  .route("/")
  .get(async (req, res) => {
    try {
      const group = await Group.findAll();
      return res.json(group);
    } catch (error) {
      return res.statusCode(500).send({ message: error.message });
    }
  })
  .post(async (req, res) => {
    const { role } = req.body;
    try {
      const newRole = await Group.create({ group_name: role });
      return res.json(newRole);
    } catch (error) {
      return res.statusCode(500).send({ message: error.message });
    }
  })
  .put((req, res) => {
    res.send("roles Route");
  })
  .delete((req, res) => {
    res.send("roles Route");
  });

module.exports = router;
