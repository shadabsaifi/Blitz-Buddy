const mongoose = require('../config/connection');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var TankSchema = new Schema({

    tankName :{ 
        type:String
    },

    image:{
        type:String
    },

    description:{
        type:String
    }

}, {
    timestamps:true
})

TankSchema.plugin(mongoosePaginate);

var TankModel = mongoose.model('tank', TankSchema, 'tank');

module.exports = TankModel;

