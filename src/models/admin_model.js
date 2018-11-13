const mongoose = require('../config/connection');
var Schema = mongoose.Schema;


var adminSchema = new Schema({

    fullName:{ type:String },
    image:{ type:String },
    email:{ type:String },
    phone:{ type:String },
    otp:{ type:Number },
    secureKey:{ type:String }
    

}, {
    timestamps:true
})

var adminModel = mongoose.model('admin', adminSchema, 'admin');

module.exports = adminModel;

adminModel
.findOne({})
.then((result) => {
    if(!result){
        adminModel.create({
            fullName:"WOTB",
            image:"http://res.cloudinary.com/dvflctxao/image/upload/v1541402237/zcscw0yullewrv96xkp7.jpg",
            email:"fluper@fluper.in",
            phone:"01204168013",
        })
    }
}).catch((err) => {
        console.log("admin error=====>>>>",err)
});