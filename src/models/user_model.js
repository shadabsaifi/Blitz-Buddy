var mongoose = require('../config/connection');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    
    fullName:{ type:String, trim:true },
    countryCode:{ type:String, default:"+91" },
    phone:{ type:String },
    email:{ type:String },
    image:{ type:String },
    deviceType:{ type:String, enum:['ANDROID', 'IOS'] }, 
    deviceToken:{ type:String },
    password:{ type:String },
    status:{ type:String, enum:['ACTIVE', 'INACTIVE', 'BLOCKED'], default:"INACTIVE" },
    otp:{ type:Number },
    secureKey:{ type:String }
}, {
    timestamps:true
});

UserSchema.plugin(mongoosePaginate);

var User = mongoose.model('user', UserSchema, 'user');

module.exports = User;

