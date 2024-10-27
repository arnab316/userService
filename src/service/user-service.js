const axios = require('axios');
const {UserRepository} = require('../repositories');
const { InvalidPasswordError, UserNotFoundError } = require('../utils/custom-errors')
const AppError = require('../utils/error-handler');
const { StatusCodes } = require('http-status-codes');
const ValidationError = require('../utils/validation-error');
const {UniqueConstraintError} = require('sequelize');
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async registerUser(data){
    console.log('Data received in service layer:', data);
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
    //  const { authId, passwordhash } = response.data;
     const { id: authId, passwordhash } = response.data.data
     return {
      user: newUser, // From UserService
      authId: authId, // From AuthService
      passwordhash: passwordhash, // Hashed password from AuthService
    };
  } catch(error){
    if (error instanceof UniqueConstraintError) {
      throw new ValidationError(error);
    }

    throw new AppError('Unable to create user', 'UserCreationError', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  }

  async login(username, password) {
    try {
      const user = await this.userRepository.findUserByField('username', username)
      if (!user) {
        throw new UserNotFoundError(); 
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
      const { status, data } = error.response;
      if (error.response && error.response.status === 401) {
        throw new InvalidPasswordError(); 
    } else if (status === 500 && data.message === 'Invalid password') {
      throw new InvalidPasswordError();
    }else {
      throw new AppError('UnexpectedError', 
        'An unexpected error occurred.',
         error.message,
         StatusCodes.INTERNAL_SERVER_ERROR);
    }
      // console.log(error);
    
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
  async getAllUsers() {
    try {
      const users = await this.userRepository.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }
  async findUserByUsername(username){
    try {
      const user = await this.userRepository.findUserByUsername(username);
      return user;
    } catch (error) {
      throw error
    }
  }
  async getUserById(userId){
    try {
      console.log('service layer :'+ userId);
      const user = await this.userRepository.findUserById(userId);
      return user;
    } catch (error) {
      throw new  AppError('UnexpectedError', 
        'An unexpected error occurred.',
         error.message,
         StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = UserService;