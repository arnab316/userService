'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserPreferences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations
      UserPreferences.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      UserPreferences.hasMany(models.FavoriteGenre, {
        foreignKey: 'userPreferencesId',
        as: 'favoriteGenres',
      });
      UserPreferences.hasMany(models.Language, {
        foreignKey: 'userPreferencesId',
        as: 'languages',
      });
    }
  }

  UserPreferences.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'UserPreferences',
    timestamps: false, // No createdAt or updatedAt fields
  });

  return UserPreferences;
};
