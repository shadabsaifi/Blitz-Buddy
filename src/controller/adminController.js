var common = require('../common/common');
var code = require('../common/responseCode');
var message = require('../common/responseMessage');
var fields = require('../common/required');
var Admin = require('../models/admin_model');
var User = require('../models/user_model');


let getAdminDetail = (req, res)=>{

    let { adminId } = req.query;
    let given = { adminId };
    common.checkKeyExist(given, fields.getAdminDetail)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            Admin.findById(adminId)
            .then(admin=>{
                if(admin)
                    return common.response(res, code.EVERYTHING_IS_OK, message.SUCCESS, admin);
                else
                    return common.response(res, code.NOT_FOUND, message.ADMIN_NOT_EXISTS);
            }, err=>{
                return common.response(res, code.NOT_FOUND, message.INTERNAL_SERVER_ERROR)
            })
        }
    })
    .catch((err)=>{ return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})

}   

let editAdminProfile = (req, res)=>{

    let { adminId, fullName, image, email, phone } = req.body;
    let given  = { adminId };
    common.checkKeyExist(given, fields.editAdminProfile)
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
                    Admin.findByIdAndUpdate(adminId, req.body)
                    .then(tank=>{
                        if(tank)
                            return common.response(res, code.EVERYTHING_IS_OK, message.PROFILE_SUCCESSFULLY_UPDATE);
                        else
                            return common.response(res, code.NOT_FOUND, message.ADMIN_NOT_EXISTS);
                    }, err=>{
                        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
                    })      
                }
            })
        }
    })
    .catch((err)=>{ return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
}





module.exports = {

    getAdminDetail,
    editAdminProfile,
    
}