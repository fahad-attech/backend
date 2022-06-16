const express = require("express");
require("dotenv").config();
const { sequelize, Todos, User } = require("./models");
const user = require("./controller/User");
const todos = require("./controller/Todos");
const roles = require("./controller/Groups");
const auth = require("./controller/Auth");
const userRole = require("./controller/UserRole");
const rolePermissions = require("./controller/RolePermissions");
const permissions = require("./controller/Permissions");
const subTodos = require("./controller/SubTodos");
const authMiddleware = require("./middleware/Auth");
const can = require("./middleware/RoleBase");
//initiate the app
console.log(process.env.HASH_SALTS);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3006;

//use it for all kind of /path Requests

app.use("/auth", auth);
app.use("/todo", authMiddleware, can(), todos);
app.use("/subtodo", authMiddleware, subTodos);
app.use("/user", authMiddleware, user);
app.use("/roles", authMiddleware, can(), roles);
app.use("/assign-role", authMiddleware, userRole);
app.use("/assign-permission", authMiddleware, rolePermissions);
app.use("/permission", authMiddleware, permissions);

app.listen(PORT, async () => {
  console.assert(`Server Running at ${PORT}`);
  //connect to the database
  sequelize.authenticate();
  // await sequelize.sync({ alter: true });
  console.log("CONNECTED TO DATABASE");
});
