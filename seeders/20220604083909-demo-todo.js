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
    await queryInterface.bulkInsert("Todos", [
      {
        name: "Learn Migrations",
        is_completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Implement Migrations",
        is_completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Add Seeding Data Migrations",
        is_completed: false,
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
    queryInterface.bulkDelete("Todos", null, {});
  },
};
