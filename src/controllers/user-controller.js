const {StatusCodes} = require('http-status-codes')
const {UserService} = require('../service');
const {logMessage} = require('../utils/log-service');

const userService = new UserService();
const handleError = (res, error) => {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR; 
    const errorResponse = {
        success: false,
        message: error.message || 'An unexpected error occurred',
    };
    if (error.details) {
        errorResponse.error = error.details; 
    } else {
        errorResponse.error = {
            name: error.name || 'Error',
            message: error.message || 'An error occurred',
            description: error.description || 'No additional information available',
            statusCode: statusCode,
        };
    }
    return res.status(statusCode).json(errorResponse);
};


const registerUser = async(req, res)=>{
  try {
    const { fullName, username, password } = req.body;
    const newUser = await userService.registerUser({ fullName, username, password });
    await logMessage('UserService', 'info', `successfully register a for user ${newUser.username}`);        

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'User registered successfully',
        data: newUser,
    });
  } catch (error) {
    handleError(res, error)
  }
}

const deleteUser = async(req, res) => {
    try {

        const userId = req.params.userId;
        const userExists = await userService.userExists(userId);
        if (!userExists) {
            return res.status(404).json({
              success: false,
              message: 'User not found',
            });
          }


        await userService.deleteUser(userId);
        res.status(StatusCodes.NO_CONTENT).json({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        handleError(res, error)
    }
}
const login = async(req, res) => {
    try {
        const { username, password } = req.body;
        const auth = await userService.login(username, password);
        await logMessage('UserService', 'info', `log in successfully a for user ${auth.data.userId}`);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Login successful',
            data: auth,
        });
    } catch (error) {
        handleError(res, error)
    }

}
const getAllUsers = async(req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Users fetched successfully',
            data: users,
        });
    } catch (error) {
        handleError(res, error)
    }
    
}
const  findUserByUsername= async(req, res)=>{
    try {
      const user = await userService.findUserByUsername(req.params.username);
      
      return res.status(StatusCodes.OK).json({
          success: true,
          message: 'Username fetched successfully',
          data: user,
      });
        
    } catch (error) {
        handleError(error);
        // console.log(error.message);
    }
}
module.exports = {
    registerUser,
    deleteUser,
    login,
    getAllUsers,
    findUserByUsername
}