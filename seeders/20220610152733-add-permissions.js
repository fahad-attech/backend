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
     */
    await queryInterface.bulkInsert("Permissions", [
      //Todos Permissions
      {
        id: 1,
        name: "UPDATE",
        grant: "edit-todo",
        description: "Update Access of Edit Todo.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "ADD",
        grant: "add-todo",
        description: "Add Access of add todo.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "READ",
        grant: "todos",
        description: "Read Access of todos.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "DELETE",
        grant: "todo",
        description: "Delete Access of todo.",
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
    await queryInterface.bulkDelete("Permissions", null, {});
  },
};
