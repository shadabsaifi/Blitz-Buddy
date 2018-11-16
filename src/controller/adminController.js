var common = require('../common/common');
var code = require('../common/responseCode');
var message = require('../common/responseMessage');
var fields = require('../common/required');
var Admin = require('../models/admin_model');
var User = require('../models/user_model');
var randomstring = require("randomstring");


let login = (req, res)=>{
    
    let { email, password } = req.body;
    let given = { email, password };
    common.checkKeyExist(given, fields.adminLogin)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            
            let query = { email };
            Admin.findOne(query)
            .then(admin=>{
                if(!admin)
                    return common.response(res, code.NOT_FOUND, message.PASSWORD_NOT_MATCH);
                else{
                    common.compareHash(password, admin.password, (err, isMatch)=>{
                        if(isMatch){
                            common.createToken({ _id:admin._id, email }, (err, token)=>{
                                if(token){
                                    console.log('====================================');
                                    console.log(token);
                                    console.log('====================================');
                                    let { _id } = admin;
                                    let data = { _id, token }
                                    return common.response(res, code.EVERYTHING_IS_OK, message.SUCCESSFULLY_LOGIN, data);
                                }
                            })
                        }
                        else
                            return common.response(res, code.NOT_FOUND, message.PASSWORD_NOT_MATCH);            
                        
                    })
                }

            }, err=>{
                return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);     
            });
        }
    })
    .catch((err)=>{ return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
}


let verifyToken = (req, res, next)=>{

    let { authorization } = req.headers;
    console.log('====================================');
    console.log(authorization);
    console.log('====================================');
    common.decodeToken(authorization, (err, decoded)=>{
        console.log('====================================');
        console.log(err);
        console.log('====================================');
        console.log('====================================');
        console.log(decoded);
        console.log('====================================');
        if(err)
            return common.response(res, code.UNAUTHORIZED,  "Invalid token.");
        else
            next();
    })

}

let forgotPassword = (req, res)=>{
    let { email, link } = req.body;
    let given = { email, link }
    common.checkKeyExist(given, fields.adminForgotPassword)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{

            let query = { email }
            let secureKey = randomstring.generate();
            Admin.findOneAndUpdate(query, { secureKey }, { new:true })
            .then(admin=>{
                if(admin){
                    let subject = "Reset Password Link";
                    let msg = "You have recieved a mail to change your password";
                    let newlink = link+admin._id+"/"+secureKey;
                    common.sendEmail(email, subject, msg, newlink, null, null, (err, sent)=>{
                        if(err)
                            return common.response(res, code.FORBIDDEN, message.EMAIL_ERROR);
                        else
                            return common.response(res, code.EVERYTHING_IS_OK, message.EMAIL_SEND);
                    });
                }
                else
                    return common.response(res, code.NOT_FOUND, message.ADMIN_NOT_EXISTS);
            }, err=>{
                return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
            })        
        }
    })
    .catch(err=> { return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})

}

let verifySecureKey = (req, res)=>{

    let { secureKey, adminId } = req.body;
    let given = { secureKey, adminId };
    common.checkKeyExist(given, fields.verifySecureKey)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            Admin.findById(adminId)
            .then(admin=>{
                if(!admin)
                    return common.response(res, code.NOT_FOUND, message.ADMIN_NOT_EXISTS);
                else{
                    if(secureKey == admin.secureKey)
                        return common.response(res, code.EVERYTHING_IS_OK, message.SUCCESS)
                    else
                        return common.response(res, code.NOT_FOUND, message.INVALID_URL)
                }
                
            }, err=>{
                return common.response(res, code.NOT_FOUND, message.INTERNAL_SERVER_ERROR)
            })
        }
    })
    .catch((err)=>{ return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})

}

let resetPassword = (req, res)=>{

    let { password, adminId } = req.body;
    let given = { password, adminId };
    common.checkKeyExist(given, fields.adminResetPassword)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            Admin.findById(adminId)
            .then(admin=>{
                if(!admin)
                    return common.response(res, code.NOT_FOUND, message.ADMIN_NOT_EXISTS);
                else{
                    common.createHash(password, (err, hash)=>{
                        if(hash){
                            let secureKey = randomstring.generate();
                            let options = { password:hash, secureKey }
                            Admin.findOneAndUpdate(adminId, options, { new:true })
                            .then(admin=>{
                                if(admin)
                                    return common.response(res, code.EVERYTHING_IS_OK, message.PASSWORD_SUCCESSFULLY_CHANGE);
                                else
                                    return common.response(res, code.NOT_FOUND, message.ADMIN_NOT_EXISTS);
                            }, err=>{
                                return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
                            })
                        }
                        else
                            return common.response(res, code.BAD_REQUEST, message.OLD_PASSWORD_NOT_MATCH)
                    })
                }
                
            }, err=>{
                return common.response(res, code.NOT_FOUND, message.INTERNAL_SERVER_ERROR)
            })
        }
    })
    .catch((err)=>{ return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})


}


let changePassword = (req, res)=>{

    let { oldPassword, newPassword, adminId } = req.body;
    let given = { oldPassword, newPassword, adminId };
    common.checkKeyExist(given, fields.adminChangePassword)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            Admin.findById(adminId)
            .then(admin=>{
                if(!admin)
                    return common.response(res, code.NOT_FOUND, message.ADMIN_NOT_EXISTS);
                else{
                    common.compareHash(oldPassword, admin.password, (err, isMatch)=>{
                        if(isMatch){
                            common.createHash(newPassword, (err, hash)=>{
                                let options = { password:hash }
                                Admin.findByIdAndUpdate(adminId, options, (err, result)=>{
                                    if(err)
                                        return common.response(res, code.NOT_FOUND, message.INTERNAL_SERVER_ERROR)
                                    else
                                        return common.response(res, code.EVERYTHING_IS_OK, message.PASSWORD_SUCCESSFULLY_CHANGE);
                                })
                            })
                        }
                        else
                            return common.response(res, code.BAD_REQUEST, message.OLD_PASSWORD_NOT_MATCH)
                    })
                }
                
            }, err=>{
                return common.response(res, code.NOT_FOUND, message.INTERNAL_SERVER_ERROR)
            })
        }
    })
    .catch((err)=>{ return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})

}

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

    let { adminId, fullName, image, email, phone, city, description } = req.body;
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
                            return common.response(res, code.NEW_RESOURCE_CREATED, message.PROFILE_SUCCESSFULLY_UPDATE);
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

    login,
    verifyToken,
    forgotPassword,
    verifySecureKey,
    resetPassword,
    changePassword,
    getAdminDetail,
    editAdminProfile,
    
}