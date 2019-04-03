const express = require('express');
const {body} = require('express-validator/check');

const authController = require('../controllers/auth');

const User = require('../models/user');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.put(
    '/signup',
    [
        body('email').withMessage('Please enter a valid email')
            .custom((value, {req}) => {
                return User.findOne({email: value}).then(user => {
                    if (user) {
                        return Promise.reject('Email adress already exists!');
                    }
                })
            }),
            body('password').trim().isLength({min: 5}),
            body('phone').trim().isLength({max: 10}),
            body('name').trim().not().isEmpty(),
            body('address').trim(),
    ],
    authController.signup);

router.post('/login' , authController.login);
router.get('/:id',isAuth , authController.getDetailById);
router.put('/:id',isAuth , authController.updateAdminDetail);
module.exports = router;