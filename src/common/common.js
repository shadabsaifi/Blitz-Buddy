const bcrypt = require('bcrypt-nodejs');
var constant = require('./constant');
var config = require('../config/config');
var NodeGeocoder = require('node-geocoder');
const nodemailer = require('nodemailer')
let transporter;
const client = require('twilio')(config.twilio.sid, config.twilio.auth_token);
const _ = require('lodash');
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: config.cloud.cloud_name,
    api_key: config.cloud.api_key,
    api_secret: config.cloud.api_secret
});

var jwt = require('jsonwebtoken');

// fcm  for send notification through device token
var FCM = require('fcm-node');
var serverKey = 'AAAAyCiHlQQ:APA91bGk90THJkD7Bu603_lEIkzEb4uw2_xounite7_UrRxKtWUxvWLHNY7R-QH8OVG3_AKKqSdrfxGBRJA1OHlU37MK_MI6hPM-6l22XIK0U-A3NAsInmjNWUCnPJAe8U-1QNfnsEEL';
var fcm = new FCM(serverKey);

let response = (res, code, msg, result)=>{
    
    return res.json({

        responseCode:code,
        responseMessage:msg,
        result:result
    });
}

let checkKeyExist = (req, arr)=>{
    return new Promise((resolve, reject)=>{
        var array = [];
		_.map(arr, (item) => {
			if(req.hasOwnProperty(item)) {
				var value = req[item];
				if( value == '' || value == undefined ){ 
					array.push(item+" can not be empty");
				}
				resolve(array);
			} else {
				array.push(item+" key is missing");
				resolve(array);
			}
		});
    })
}

let createToken = (data, cb)=>{

    jwt.sign(data, 'secret', (err, token)=>{
        if(token)
            cb(null, token)
        else
            cb(err);
    });
}

let decodeToken = (token, cb)=>{

    jwt.verify(token, 'secret', (err, decoded)=>{
        if(err)
            cb(err)
        else
            cb(null, decoded)
    });
}


let createHash = (password, cb)=>{
    
    bcrypt.hash(password, null, null, (err, hash)=>{
        if(err)
            cb(err)
        else
            cb(null, hash)
    });
}

let compareHash = (password, hash, cb)=>{
    
    bcrypt.compare(password, hash, (err, res)=>{
        if(res)
            cb(null, res)
        else
            cb(err)
    });
}

let sendOTP = (verification_code, countryCode, sendTo)=>{

    client.messages.create({
        to:  countryCode+sendTo,
        from: config.twilio.number,
        body: 'Your one-time password is ' + verification_code,
    })
    .then((message) => {
        console.log("message sent successfully. ",message.sid)
    }, (err) => {
            console.log(err);
    });
}

let sendEmail = (email, subject, message, link, cc, bcc, cb) => {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: config.nodemailer
    });
    let messageObj = {
        from: 'Noreply<'+config.nodemailer.user+'>',
        to: email,
        subject: subject,
        text: message,//"A sentence just to check the nodemailer",
        html: "Click on this link to <a href=" + link + ">Click Here</a>",
        cc:cc,
        bcc:bcc
    }
    transporter.sendMail(messageObj, (err, info) => {
        if (err) {
            cb(err)
            console.log("Error occured", err)
        } else {
            cb(null, "success");
            console.log("Mail sent")
        }
    })
}

let imageUploadToCoudinary = (base64, cb)=>{
    if(base64){
        cloudinary.uploader.upload(base64, (result)=>{ 
            if(result)
                cb(null, result.url);
            else
                cb('err'); 
        })
    }
    else
        cb(null, "");
}

let uploadMultipleImages = (imagesB64, callback) => {
    let a = [];
    async.eachSeries(imagesB64, (item, callbackNextIteratn) => {
        module.exports.imageUploadToCloudinary(item, (url) => {
            a[a.length] = url;
            callbackNextIteratn();
        })
    }, (err) => {
        callback(a);
        console.log("Done with async loop")
    })
}

let getLatLong = (place, callback) => {
    let fn,temp;
    var geocoder = NodeGeocoder(config.googleLetLong);
    geocoder.geocode(place, function(err, result) {
        if (result) {
            callback(result[0].latitude, result[0].longitude)
        }
    });
   
}

let notification = (token)=>{

    var message = {
        to: token,
        collapse_key: 'YOUR_COLLAPSE_KEY',
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    fcm.send(message, (err, response)=>{
        if (err) {
            cb(err)
            console.log("Something has gone wrong!", err);
        } else {
            cb(null, response)
            console.log("Successfully sent with response: ", response);
        }
    });
}

module.exports = {

    checkKeyExist,
    response,
    createToken,
    decodeToken,
    createHash,
    compareHash,
    sendOTP,
    sendEmail,
    imageUploadToCoudinary,
    uploadMultipleImages,
    getLatLong,
    notification
    
}