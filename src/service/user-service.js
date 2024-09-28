const axiosInstance = require('../config/axiosConfig')
const axios = require('axios');
const {UserRepository} = require('../repositories');


class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async registerUser(data){
  try {

    //* Create the user in the UserRepository
    const newUser = await this.userRepository.createUser({
      fullName: data.fullName,
      username: data.username,
    });
      //* Get the userId from the newly created user
      const userId = newUser.userId;

    //* send the userId and password to the authService

    const authServiceUrl = 'http://localhost:4000/api/v1/singup';
    const authData = {
      userId: userId, // Send the generated userId
      passwordhash: data.password, // Send the raw password
    };
    const response = await axios.post(authServiceUrl, authData);


     // Extract auth details from AuthService response
     const { authId, passwordhash } = response.data;

     return {
      user: newUser, // From UserService
      authId: authId, // From AuthService
      passwordhash: passwordhash, // Hashed password from AuthService
    };
  } catch (error) {
    console.log(error)
    throw error;
  }

  }

  async login(username, password) {
    try {
      const user = await this.userRepository.findUserByField('username', username)
      if (!user) {
        throw new Error('User not found');

    }
    const userId = user.userId;
      const authServiceUrl = 'http://localhost:4000/api/v1/login';
      const authData = {
        userId: userId, 
        password: password, 
      };
      const response = await axios.post(authServiceUrl, authData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteUser(userId){

    try {
      return await this.userRepository.deleteUser(userId);
    } catch (error) {
      throw error;
    }
  }

  async userExists(userId) {
    const user = await this.userRepository.findUserById(userId);
    return user !== null; 
  }
}

module.exports = UserService;