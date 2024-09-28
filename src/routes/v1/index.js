const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user-controller');
router.post('/register', userController.registerUser);
router.post('/login', userController.login); 
router.delete('/users/:userId', userController.deleteUser);
router.get('/test', (req, res) => {
    res.json({ message: 'User API is working!' });
  });

module.exports = router;