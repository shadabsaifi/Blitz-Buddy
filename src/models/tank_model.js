const mongoose = require('../config/connection');

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

})

var TankModel = mongoose.model('tank', TankSchema, 'tank');

module.exports = TankModel;

