var adminRouter = require('express').Router();
var staticController = require('../controller/staticController');
var tankController = require('../controller/tankController');
var adminController = require('../controller/adminController');
var videoController = require('../controller/videoController');

//admin router
adminRouter.post('/editAdminProfile', adminController.editAdminProfile);
adminRouter.get('/getAdminDetail', adminController.getAdminDetail);

// static content router
adminRouter.post('/getStaticContent', staticController.getStaticContent);
adminRouter.post('/updateStaticContent', staticController.updateStaticContent);
adminRouter.post('/deleteStaticContent', staticController.deleteStaticContent);

// tank router
adminRouter.post('/addTank', tankController.addTank);
adminRouter.get('/getTankDetail', tankController.getTankDetail);
adminRouter.post('/getAllTank', tankController.getAllTank);
adminRouter.get('/deleteTank', tankController.deleteTank);
adminRouter.post('/editTankDetail', tankController.editTankDetail);

// video router
adminRouter.post('/addVideo', videoController.addVideo);
adminRouter.get('/getVideoDetail', videoController.getVideoDetail);
adminRouter.post('/getAllVideo', videoController.getAllVideo);
adminRouter.get('/deleteVideo', videoController.deleteVideo);
adminRouter.post('/editVideoDetail', videoController.editVideoDetail);

module.exports = adminRouter;