const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Minimum 3 characters required'),
    body('password').isLength({min:6}).withMessage('Minimum 6 characters required')
],
userController.registerUser
);


module.exports = router;