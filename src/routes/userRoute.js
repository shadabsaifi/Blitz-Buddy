var userRouter = require('express').Router();
var userController = require('../controller/userController');


// userController
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.post('/verifyOTP', userController.verifyOTP);
userRouter.post('/forgotPassword', userController.forgotPassword);
userRouter.post('/resendOTP', userController.resendOTP);
userRouter.post('/resetPassword', userController.resetPassword);
userRouter.post('/getUserDetail', userController.getUserDetail);
userRouter.post('/editUserProfile', userController.editUserProfile);
userRouter.post('/notification', userController.notification);

module.exports = userRouter;
