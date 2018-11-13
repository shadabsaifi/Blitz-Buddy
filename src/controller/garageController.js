var GarageModel = require('../models/garage_model');
var common = require('../common/common');
var code = require('../common/responseCode');
var message = require('../common/responseMessage');
var fileds = require('../common/required');

let getGarage = (req, res)=>{

    let { garageType } = req.body;
    let given = { garageType }
    let options = { createdAt:1, updatedAt:1 };
    options[garageType] = 1;
    common.checkKeyExist(given, fileds.getGarage)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            GarageModel.findOne({}, options)
            .then((result) => {
                return common.response(res, code.EVERYTHING_IS_OK, message.SUCCESS, result);
            }, err=>{
                return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)
            });
        }
    })
    .catch((err) => {
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
    })
}

let updateGarage = (req, res)=>{

    let { garageType, data } = req.body;
    let given = { garageType, data };
    let options = {  };
    options[garageType] = data;
    common.checkKeyExist(given, fileds.updateGarage)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            GarageModel.update({}, options)
            .then(garage=>{
                if(garage)
                    return common.response(res, code.EVERYTHING_IS_OK, message.GARAGE_SUCCESSFULLY_UPDATED)
                else
                    return common.response(res, code.NOT_FOUND, message.GARAGE_NOT_FOUND);
            }, err=>{
                return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)
            })
        }
    })
    .catch((err)=>{ return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
}

let deleteGarage = (req, res)=>{

    let { garageType } = req.body;
    let given = { garageType };
    let options = {  };
    options[garageType] = "";
    common.checkKeyExist(given, fileds.deleteGarage)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            GarageModel.update({}, options)
            .then(garage=>{
                if(garage)
                    return common.response(res, code.NEW_RESOURCE_CREATED, message.GARAGE_SUUCCESSFULLY_DELETED)
                else
                    return common.response(res, code.NOT_FOUND, message.GARAGE_NOT_FOUND);
            }, err=>{
                return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)
            })
        }
    })
    .catch((err)=>{ return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
}


module.exports = {

    getGarage,
    updateGarage,
    deleteGarage
}