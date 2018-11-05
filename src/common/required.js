module.exports = {

    // admin Validation
    getAdminDetail:['adminId'],
    editAdminProfile:['adminId'],

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
    updateStaticContent:['staticId', 'staticType', 'data'],
    getStaticContent:['staticType'],
    deleteStaticContent:['staticId', 'staticType'],

    //tank validation
    addTank:['tankName', 'image', 'description'],
    getTankDetail:['tankId'],
    deleteTank:['tankId'],
    editTankDetail:['tankId']

}