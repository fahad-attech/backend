"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 1	"super-admin"
     * 2	"admin"
     * 3	"user"
     * Grants:
     * 1	"UPDATE"	"edit-todo"
     * 2	"ADD"	"add-todo"
     * 3	"READ"	"todos"
     * 4	"DELETE"	"todo"
     */
    await queryInterface.bulkInsert("RolePermissions", [
      //User can add edit Read
      {
        id: 1,
        GroupId: 3,
        PermissionId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        GroupId: 3,
        PermissionId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
