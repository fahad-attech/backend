"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Permission, RolePermission, UserRole }) {
      // define association here
      this.belongsToMany(User, { through: UserRole });
      this.belongsToMany(Permission, { through: RolePermission });
    }
  }
  Group.init(
    {
      group_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
