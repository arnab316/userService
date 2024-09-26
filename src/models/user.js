'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Watchlist, {
        foreignKey: 'userId',
        as: 'watchlist',
      });
      User.hasOne(models.UserPreferences, {
        foreignKey: 'userId',
        as: 'preferences',
      });
    }
  }
  User.init({
    userId: {
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
    allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true, 
  });
  return User;
};