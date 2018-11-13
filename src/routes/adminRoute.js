var adminRouter = require('express').Router();
var staticController = require('../controller/staticController');
var tankController = require('../controller/tankController');
var adminController = require('../controller/adminController');
var userController = require('../controller/userController');
var videoController = require('../controller/videoController');
var garageController = require('../controller/garageController');
var quesAnsController = require('../controller/quesAnsController');


// adminController
adminRouter.post('/editAdminProfile', adminController.editAdminProfile);
adminRouter.get('/getAdminDetail', adminController.getAdminDetail);

// userController
adminRouter.get('/getAllUser', userController.getAllUser);
adminRouter.post('/blockUnblockUser', userController.blockUnblockUser);
adminRouter.post('/deleteUser', userController.deleteUser);
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

module.exports = adminRouter;