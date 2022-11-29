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

    await queryInterface.bulkInsert('UserDetails', [
      {
        fullName: "Admin ASEAN Youth Forum News",
        image: "https://i.ibb.co/37c1FJH/logo-large.png",
        countryId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: "Fabyan Ihsan Sayiq",
        image: "https://i.ibb.co/vk6PhTf/gas-station.jpg",
        countryId: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     return queryInterface.bulkDelete('UserDetails', null, {});
  }
};
