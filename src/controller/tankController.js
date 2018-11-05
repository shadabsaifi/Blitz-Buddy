const TankModel = require('../models/tank_model');
const common = require('../common/common');
const code = require('../common/responseCode');
const message = require('../common/responseMessage');
const fileds = require('../common/required');

let addTank = (req, res)=>{

    let { tankName, image, description } = req.body;
    let given  = { tankName, image, description };
    common.checkKeyExist(given, fileds.addTank)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            TankModel.findOne({ tankName })
                .then(tank=>{
                    if(tank)
                        return common.response(res, code.ALREADY_EXIST, message.TANK_ALREADY_EXISTS)
                    else{

                        common.imageUploadToCoudinary(image, (err, url)=>{
                            if(url)
                                given.image = url
                            TankModel.create(given, (err, success)=>{
                                if(err)
                                    return common.response(res, code.INTERNAL_SERVER_ERROR, message.IMAGE_UPLOAD_ERROR);
                                else
                                    return common.response(res, code.EVERYTHING_IS_OK, message.TANK_SUCCESSFULLY_ADDED);        
                            });
                        })
                    }
                }, err=>{
                    return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR) 
                })
        }
    }, err=>{
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
    })
    .catch(err=> { return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
}

let getAllTank = (req, res)=>{

    let { tankId } = req.body;
    let given  = { tankId };
    TankModel.find({})
    .then(tanks=>{
        return common.response(res, code.EVERYTHING_IS_OK, message.SUCCESS, tanks);
    }, err=>{
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
    })

}

let getTankDetail = (req, res)=>{
    
    let { tankId } = req.query;
    let given  = { tankId };
    common.checkKeyExist(given, fileds.getTankDetail)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            TankModel.findById(tankId)
            .then(tank=>{
                if(tank)
                    return common.response(res, code.EVERYTHING_IS_OK, message.SUCCESS, tank);
                else
                    return common.response(res, code.NOT_FOUND, message.TANK_NOT_EXISTS);
            }, err=>{
                return common.response(res, code.NOT_FOUND, message.INTERNAL_SERVER_ERROR)
            })
        }
    }, err=>{
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
    })
    .catch(err=> { return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
}

let deleteTank = (req, res)=>{

    let { tankId } = req.query;
    let given  = { tankId };
    common.checkKeyExist(given, fileds.deleteTank)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            TankModel.remove({_id:tankId})
            .then(tank=>{
                if(tank)
                    return common.response(res, code.EVERYTHING_IS_OK, message.TANK_SUCCESSFULLY_DELETED);
                else
                    return common.response(res, code.NOT_FOUND, message.TANK_NOT_EXISTS);
            }, err=>{
                return common.response(res, code.NOT_FOUND, message.INTERNAL_SERVER_ERROR, err)
            })
        }
    }, err=>{
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
    })
    .catch(err=> { return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
}

let editTankDetail = (req, res)=>{

    let { tankId, tankName, image, description } = req.body;
    let given  = { tankId };
    common.checkKeyExist(given, fileds.editTankDetail)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            common.imageUploadToCoudinary(image, (err, url)=>{
                if(err)
                    return common.response(res, code.INTERNAL_SERVER_ERROR, message.IMAGE_UPLOAD_ERROR,err);
                else{
                    if(url)
                        req.body.image = url;
                    else
                        delete req.body['image'];
                    TankModel.findByIdAndUpdate(tankId, req.body)
                    .then(tank=>{
                        if(tank)
                            return common.response(res, code.EVERYTHING_IS_OK, message.TANK_SUCCESSFULLY_UPDATE);
                        else
                            return common.response(res, code.NOT_FOUND, message.USER_NOT_EXISTS);
                    }, err=>{
                        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
                    })      
                }
            })
        }
    }, err=>{
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
    })
    .catch(err=> { return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
}

module.exports = {
    
    addTank,
    getAllTank,
    getTankDetail,
    deleteTank,
    editTankDetail
}