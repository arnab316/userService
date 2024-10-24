const { StatusCodes } = require('http-status-codes'); 
const AppError = require('./error-handler'); 

class InvalidPasswordError extends AppError {
    constructor() {
        super('InvalidPasswordError', 'Invalid password', 'The password provided is incorrect.', StatusCodes.UNAUTHORIZED);
    }
}

class UserNotFoundError extends AppError {
    constructor() {
        super('UserNotFoundError', 'User not found', 'The specified user does not exist.', StatusCodes.NOT_FOUND);
    }
}

module.exports = {
    InvalidPasswordError,
    UserNotFoundError,
};