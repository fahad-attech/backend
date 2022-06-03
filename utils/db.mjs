import { Sequelize } from "sequelize";

const sequelize = new Sequelize("TodoDb", "postgress", "root", {
  host: "localhost",
  dialect: "postgres",
});
