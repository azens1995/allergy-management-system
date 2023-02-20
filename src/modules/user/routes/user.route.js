const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/refreshToken', userController.refreshToken);

module.exports = router;
