module.exports = {

    // admin Validation
    getAdminDetail:['adminId'],
    editAdminProfile:['adminId'],
    blockUnblockUser:['userId', 'requestType'],
    deleteUser:['userId', 'requestType'],

    //user validation
    signup:['fullName', 'countryCode', 'phone', 'email', 'password'],
    login:['countryCode','phone', 'password'],
    verifyOTP:['otp', 'userId'],
    forgotPassword:['countryCode', 'phone'],
    resendOTP:['userId'],
    resetPassword:['password', 'userId', 'secureKey'],
    getUserDetail:['userId'],
    editUserProfile:['userId'],
    
    //static validation
    updateStaticContent:['staticType', 'data'],
    getStaticContent:['staticType'],
    deleteStaticContent:['staticType'],

    //tank validation
    addTank:['tankName', 'image', 'description'],
    getTankDetail:['tankId'],
    deleteTank:['tankId'],
    editTankDetail:['tankId'],

    //video validation
    addVideo:['title', 'link', 'description'],
    getVideoDetail:['videoId'],
    deleteVideo:['videoId'],
    editVideoDetail:['videoId'],

    //garage validation
    getGarage:['garageType'],
    updateGarage:['garageType', 'data'],
    deleteGarage:['garageType']

}