const mongoose = require('../config/connection');
var Schema = mongoose.Schema;


var notificationSchema = new Schema({

    title:[Array] 

}, {
    timestamps:true
})

var notificationModel = mongoose.model('notification', notificationSchema, 'notification');

module.exports = notificationModel;

notificationModel.findOne({}, (err, result)=>{
    if(err)
        console.log("error occour");
    else{
        if(result == null){
            var notification = {
                title:[
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    'other'
                ]
            }
            notificationModel.create(notification, (err, success)=>{
                if(err)
                    console.log("error occour");
                else
                    console.log("Notification successfully added.");
            })
        }
    }
})
