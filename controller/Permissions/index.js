const express = require("express");
const { User, Todos, Group, Permission } = require("../../models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    //this api is only for super admin
    //change in db.
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
});

//add Permision.
router.post("/", async (req, res) => {
  try {
    const { name, grant, description } = req.body;
    if (!name && !grant && !description) {
      res.status(500).send("Send all the required parameters.");
    }
    const permissions = await Permission.create({ name, grant, description });
    console.log(permissions);
    // if (permissions) {
      res.send("Permission Added successfully.");
    // }
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
});

module.exports = router;
