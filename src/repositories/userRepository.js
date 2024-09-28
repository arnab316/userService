const { User } = require('../models');

class UserRepository {
  async createUser(data) {
    try {
      const newUser =  await User.create({
        fullName: data.fullName,
        username: data.username,
      });
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Unable to create user');
    }
  }
  async findUserByField(field, value) {
    try {
      return await User.findOne({ where: { [field]: value } });
    } catch (error) {
      console.error(`Error finding user by ${field}:`, error);
      throw new Error('Unable to find user');
    }
  }
  async getUserByUsername(username) {
   try {
    return await User.findOne({ where: { username } });
   } catch (error) {
    console.log(error)
   }
  }


  async findUserById(userId) {
    try {
      return await User.findByPk(userId);
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Unable to find user');
    }
  }

  async findUserByUsername(username) {
    try {
      return await User.findOne({ where: { username } });
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw new Error('Unable to find user');
    }
  }

  async updateUser(userId, data) {
    try {
      return await User.update(data, { where: { userId }, returning: true });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Unable to update user');
    }
  }

  async deleteUser(userId) {
    try {
      return await User.destroy({ where: { userId } });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Unable to delete user');
    }
  }

  async getAllUsers() {
    try {
      return await User.findAll();
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw new Error('Unable to retrieve users');
    }
  }
}

module.exports =  UserRepository;
