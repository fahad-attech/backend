const express = require("express");
const {
  User,
  Todos,
  Group,
  RolePermission,
  Permission,
  UserRole,
} = require("../../models");
const router = express.Router();

//get permissions of user.
router.get("/", async (req, res) => {
  try {
    //this api is only for super admin
    const { id } = req.query;
    const permissions = await Permission.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Group,
          // through: RolePermission,
          attributes: [],
          include: [
            {
              attributes: [],
              model: User,
              where: {
                id,
              },
              // through: UserRole,
            },
          ],
        },
      ],
    });
    res.json(permissions);
  } catch (error) {}
});

//add Permision.
router.post("/", async (req, res) => {
  try {
    const { role, permissionId } = req.body;
    if (!role || !permissionId) {
      return res.status(500).send("Role and permissionId are required fields.");
    }
    //check if role exists
    const existingRole = await Group.findOne({
      where: {
        group_name: role,
      },
    });
    if (!existingRole) {
      return res.status(400).send("Role not found.");
    }
    const exisitingPermissions = await Permission.findOne({
      where: { id: permissionId },
    });

    if (!exisitingPermissions) {
      return res.status(400).send("Permission not found.");
    }
    const permissionToRole = await existingRole.addPermission(permissionId);
    if (!permissionToRole) {
      return res.status(400).send("Permission added already.");
    }
    res.json(permissionToRole);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
});

module.exports = router;
