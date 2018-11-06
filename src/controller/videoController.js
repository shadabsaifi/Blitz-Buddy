var common = require('../common/common');
var code = require('../common/responseCode');
var message = require('../common/responseMessage');
var fields = require('../common/required');
var videoModel = require('../models/video_model');



let addVideo = (req, res)=>{

    let { title, link, description } = req.body;
    let given  = { title, link, description };
    common.checkKeyExist(given, fields.addVideo)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            videoModel.findOne({ title })
                .then(video=>{
                    if(video)
                        return common.response(res, code.ALREADY_EXIST, message.VIDEO_ALREADY_EXISTS)
                    else{

                        videoModel.create(given, (err, success)=>{
                            if(err)
                                return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
                            else
                                return common.response(res, code.EVERYTHING_IS_OK, message.VIDEO_SUCCESSFULLY_ADDED);        
                        });
                    }
                }, err=>{
                    return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR) 
                })
        }
    }, err=>{
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
    })
    .catch(err=> { return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
}

let getAllVideo = (req, res)=>{

    let { search } = req.body;
    let query = { }
    if(search)
        query.title = search;
    let options = {
        page:req.body.page || 1,
        limit:req.body.limit || 10,
        sort:{ createdAt:-1 }
    }
    videoModel.paginate(query, options)
    .then(videos=>{
        return common.response(res, code.EVERYTHING_IS_OK, message.SUCCESS, videos);
    }, err=>{
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
    })

}

let getVideoDetail = (req, res)=>{
    
    let { videoId } = req.query;
    let given  = { videoId };
    common.checkKeyExist(given, fields.getVideoDetail)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            videoModel.findById(videoId)
            .then(video=>{
                if(video)
                    return common.response(res, code.EVERYTHING_IS_OK, message.SUCCESS, video);
                else
                    return common.response(res, code.NOT_FOUND, message.VIDEO_NOT_EXISTS);
            }, err=>{
                return common.response(res, code.NOT_FOUND, message.INTERNAL_SERVER_ERROR)
            })
        }
    }, err=>{
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
    })
    .catch(err=> { return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
}

let deleteVideo = (req, res)=>{

    let { videoId } = req.query;
    let given  = { videoId };
    common.checkKeyExist(given, fields.deleteVideo)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            videoModel.remove({_id:videoId})
            .then(video=>{
                if(video)
                    return common.response(res, code.EVERYTHING_IS_OK, message.VIDEO_SUCCESSFULLY_DELETED);
                else
                    return common.response(res, code.NOT_FOUND, message.VIDEO_NOT_EXISTS);
            }, err=>{
                return common.response(res, code.NOT_FOUND, message.INTERNAL_SERVER_ERROR, err)
            })
        }
    }, err=>{
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
    })
    .catch(err=> { return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
}

let editVideoDetail = (req, res)=>{

    let { videoId, title, link, description } = req.body;
    let given  = { videoId };
    common.checkKeyExist(given, fields.editVideoDetail)
    .then(result=>{
        if(result.length)
            return common.response(res, code.KEY_MISSING, result[0]);
        else{
            let query = { title, _id:{ $ne:videoId } }
            videoModel.findOne(query)
            .then(video=>{
            if(video)
                return common.response(res, code.ALREADY_EXIST, message.VIDEO_ALREADY_EXISTS)
            else{
                videoModel.findByIdAndUpdate(videoId, req.body)
                .then(video=>{
                    if(video)
                        return common.response(res, code.EVERYTHING_IS_OK, message.VIDEO_SUCCESSFULLY_UPDATE);
                    else
                        return common.response(res, code.NOT_FOUND, message.VIDEO_NOT_EXISTS);
                }, err=>{
                    return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
                })
            }
            }, err=>{
                return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)
            })
        }
    }, err=>{
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)     
    })
    .catch(err=> { return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)})
}

module.exports = {
    
    addVideo,
    getAllVideo,
    getVideoDetail,
    deleteVideo,
    editVideoDetail
}