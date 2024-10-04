const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user-controller');
const checkUser = require('../../middlewares/checkUser');
router.post('/register', userController.registerUser);
router.post('/login', userController.login); 
router.delete('/users/:userId', userController.deleteUser);
router.get('/users', userController.getAllUsers);
router.get('/user/:username', userController.findUserByUsername);
router.get('/test', (req, res) => {
    res.json({ message: 'User API is working!' });
  });

module.exports = router;