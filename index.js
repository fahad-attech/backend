const express = require("express");
const { sequelize, Todos, User } = require("./models");
const user = require("./controller/User/index");
const todos = require("./controller/Todos/index");
//initiate the app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3006;

//use it for all kind of /user Requests
app.use("/", todos);
app.use("/user", user);

app.listen(PORT, () => {
  console.assert(`Server Running at ${PORT}`);
  //connect to the database
  sequelize.authenticate();
  console.log("CONNECTED TO DATABASE");
});
