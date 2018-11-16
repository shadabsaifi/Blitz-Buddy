const mongoose = require('../config/connection');
var common = require('../common/common');
var Schema = mongoose.Schema;


var adminSchema = new Schema({

    fullName:{ type:String },
    image:{ type:String },
    email:{ type:String },
    phone:{ type:String },
    city:{ type:String },
    password:{ type:String },
    description:{ type:String },
    token:{ type:String },
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
        common.createHash('fluper@123', (err, hash)=>{
            if(err)
                console.log("Error while create Hash password");
            else{
                adminModel.create({
                    fullName:"Blitz Buddy",
                    image:"http://res.cloudinary.com/dvflctxao/image/upload/v1542275254/r6n4ifdpb4vnhu38dekr.jpg",
                    email:"fluper@fluper.com",
                    phone:"01204168013",
                    city:"Noida",
                    description:"Hello i am Blitz Buddy",
                    password:hash
                }, (err, admin)=>{
                    if(err)
                        onsole.log("Error while create A admin");
                    else
                        console.log("Admin Created!");
                })
            }
        })
    }
}).catch((err) => {
        console.log("admin error=====>>>>",err)
});