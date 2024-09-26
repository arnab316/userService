'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FavoriteGenres', {
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
      genre: {
        type: Sequelize.STRING,
        allowNull: false, // Ensuring genre is not null
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FavoriteGenres');
  }
};
``
