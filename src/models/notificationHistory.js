const mongoose = require('../config/connection');
var Schema = mongoose.Schema;


var historySchema = new Schema({

    title:{
        type:String
    },
    userId:{
        type:mongoose.Types.ObjectId, ref:'user'
    },
    deviceToken:{
        type:String
    },
    description:{
        type:String
    }
}, {
    timestamps:true
})

var historyModel = mongoose.model('history', historySchema, 'history');

module.exports = historyModel;