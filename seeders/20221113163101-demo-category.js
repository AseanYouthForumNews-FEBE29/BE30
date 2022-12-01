'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Categories', [
      {
        name: "Economy",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Environment",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Health",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Politic",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sport",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Other",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     return queryInterface.bulkDelete('Categories', null, {});
  }
};
