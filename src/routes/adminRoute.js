var adminRouter = require('express').Router();
var staticController = require('../controller/staticController');
var tankController = require('../controller/tankController');
var adminController = require('../controller/adminController');

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

module.exports = adminRouter;