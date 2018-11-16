var notificationHistory = require('../models/notificationHistory');
var User = require('../models/user_model');
var common = require('../common/common');
var code = require('../common/responseCode');
var message = require('../common/responseMessage');
var fileds = require('../common/required');
var async = require('async');

let sendNotification = async (req, res)=>{

    let { isAll, userDetail, description, title } = req.body;
    let given = { isAll, description, title };
    if(isAll == "true"){
        let aggregate = [ { $project: { userId:"$_id", _id: 0, deviceToken:1 } } ]
        userDetail = await User.aggregate(aggregate);
    }
    common.checkKeyExist(given, fileds.sendNotification)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            async.forEachOf(userDetail, (user, index, next)=>{
                let { userId, deviceToken } = user;
                let given = { userId, deviceToken };
                common.checkKeyExist(given, fileds.notificationKey)
                .then(result=>{
                    if(result.length)
                        return common.response(res, code.KEY_MISSING, result[0]);
                    else{
                        let newHistory = {
                            description,
                            title,
                            userId,
                            deviceToken
                        }
                        notificationHistory.create(newHistory);
                        if(deviceToken){
                            common.notification(deviceToken);
                        }
                        next();
                    }
                })
                .catch((err)=>{ return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
        
            }, (err, success)=>{
                return common.response(res, code.EVERYTHING_IS_OK, message.NOTIFICATION_SUCCESSFULLY_SEND);
            })            
        }
    })
    .catch((err)=>{ return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
}

module.exports = {

    sendNotification
}