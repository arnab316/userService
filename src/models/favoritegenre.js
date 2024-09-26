'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FavoriteGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations
      FavoriteGenre.belongsTo(models.UserPreferences, {
        foreignKey: 'userPreferencesId',
        as: 'userPreferences',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  FavoriteGenre.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userPreferencesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'FavoriteGenre',
    timestamps: false, // No createdAt or updatedAt fields
  });

  return FavoriteGenre;
};
