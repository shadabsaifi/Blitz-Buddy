var quesAnsModel = require('../models/ques_ans_model');
var common = require('../common/common');
var code = require('../common/responseCode');
var message = require('../common/responseMessage');
var fileds = require('../common/required');

let getAllQuestion = (req, res)=>{
    quesAnsModel.findOne({})
    .then((result) => {
        return common.response(res, code.EVERYTHING_IS_OK, message.SUCCESS, result);
    }, err=>{
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)
    });
}

module.exports = {

    getAllQuestion
}