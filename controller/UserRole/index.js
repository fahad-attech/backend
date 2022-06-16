const express = require("express");
const { Group, UserRole, User } = require("../../models");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    //assign roles to user
    const { userId, role } = req.body;
    if (!userId && !role) {
      return res.status(500).send("userId and role are required.");
    }
    //step 1: Grab roles from db.
    const roles = await Group.findAll();
    const rolesNames = roles.reduce((prev, curr) => {
      prev[curr.group_name] = { id: curr.id, name: curr.group_name };
      return prev;
    }, {});

    console.log(rolesNames);

    if (!rolesNames[role]) {
      return res.status(500).send("Role is invalid or does not exists");
    }

    //add it to the table
    // const userNewRole = await UserRole.create({
    //   GroupId: rolesNames[role].id,
    //   UserId: userId,
    // });
    const userNewRole = await User.findOne({ where: { id: userId } });
    const rol = await userNewRole.addGroup(2);
    if (userNewRole) {
      return res.json(rol);
    }
  } catch (error) {
    return res.status(500).send(`Something went wrong ${error.message}`);
  }
});

module.exports = router;
