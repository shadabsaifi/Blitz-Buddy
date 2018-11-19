var adminRouter = require('express').Router();
var staticController = require('../controller/staticController');
var tankController = require('../controller/tankController');
var adminController = require('../controller/adminController');
var userController = require('../controller/userController');
var videoController = require('../controller/videoController');
var garageController = require('../controller/garageController');
var quesAnsController = require('../controller/quesAnsController');
var notificationController = require('../controller/notificationController');


// adminController
adminRouter.post('/login', adminController.login);
adminRouter.post('/forgotPassword', adminController.forgotPassword);
adminRouter.post('/verifySecureKey', adminController.verifySecureKey);
adminRouter.post('/resetPassword', adminController.resetPassword);
adminRouter.post('/changePassword', adminController.changePassword);
adminRouter.post('/editAdminProfile', adminController.editAdminProfile);
adminRouter.get('/getAdminDetail', adminController.getAdminDetail);

// userController
adminRouter.post('/getAllUser', userController.getAllUser);
adminRouter.post('/actionOnUser', userController.actionOnUser);
adminRouter.post('/getUserDetail', userController.getUserDetail);

// staticController
adminRouter.post('/getStaticContent', staticController.getStaticContent);
adminRouter.post('/updateStaticContent', staticController.updateStaticContent);
adminRouter.post('/deleteStaticContent', staticController.deleteStaticContent);

// tankController
adminRouter.post('/addTank', tankController.addTank);
adminRouter.get('/getTankDetail', tankController.getTankDetail);
adminRouter.post('/getAllTank', tankController.getAllTank);
adminRouter.get('/deleteTank', tankController.deleteTank);
adminRouter.post('/editTankDetail', tankController.editTankDetail);

// videoController
adminRouter.post('/addVideo', videoController.addVideo);
adminRouter.get('/getVideoDetail', videoController.getVideoDetail);
adminRouter.post('/getAllVideo', videoController.getAllVideo);
adminRouter.get('/deleteVideo', videoController.deleteVideo);
adminRouter.post('/editVideoDetail', videoController.editVideoDetail);

// garageController
adminRouter.post('/getGarage', garageController.getGarage);
adminRouter.post('/updateGarage', garageController.updateGarage);
adminRouter.post('/deleteGarage', garageController.deleteGarage);

// quesAnsController
adminRouter.get('/getAllQuestion', quesAnsController.getAllQuestion);

// notificationController
adminRouter.post('/sendNotification', notificationController.sendNotification);

module.exports = adminRouter;