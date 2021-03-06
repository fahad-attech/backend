"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, SubTodo }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId" });
      //for Subtodos
      this.hasMany(SubTodo, { foreignKey: "parentId" });
    }
  }
  Todos.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
      },
      name: DataTypes.STRING,
      is_completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todos",
    }
  );
  return Todos;
};
