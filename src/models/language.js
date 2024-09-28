'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations
      Language.belongsTo(models.UserPreferences, {
        foreignKey: 'userPreferencesId',
        as: 'userPreferences',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Language.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userPreferencesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Language',
    timestamps: false, 
  });

  return Language;
};
