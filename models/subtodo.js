"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubTodo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Todos }) {
      // define association here
      this.belongsTo(Todos, { foreignKey: "parentId" });
    }
  }
  SubTodo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      done: DataTypes.BOOLEAN,
      parentId: {
        type: DataTypes.UUID,
        references: {
          model: "Todos",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "SubTodo",
    }
  );
  return SubTodo;
};
