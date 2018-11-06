const mongoose = require('../config/connection');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var VideoSchema = new Schema({

    title:{
        type:String
    },

    description:{
        type:String
    },

    link:{
        type:String
    }

})

VideoSchema.plugin(mongoosePaginate);
var videoModel = mongoose.model('video', VideoSchema, 'video');

module.exports = videoModel;