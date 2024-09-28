'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Languages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userPreferencesId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Ensuring userPreferencesId is not null
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Languages');
  }
};
