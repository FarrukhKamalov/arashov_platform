const AuthService = require("../services/auth.service");

const RegisterController = async (req, res) => {
    try {
        await AuthService.RegisterService(req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const resendOTPController = async(req,res)=>{
    try {
        await AuthService.resendVerifyOTPService(req,res)
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const LoginController = async (req, res) => {
    try {
        await AuthService.LoginService(req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const resetPasswordCheckUserController = async(req,res)=>{
    try{
        await AuthService.resetPasswordCheckUser(req,res);
    }catch(err){
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
} 

const resetPasswordCheckUserOtpVerifyController = async(req,res)=>{
    try {
        await AuthService.resetPasswordCheckUserOtpVerify(req,res)        
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const resetpasswordController = async(req,res)=> {
    try {
        await AuthService.resetPassword(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const verifycontroller = async(req,res)=>{
    try {
        await AuthService.verifyOTPservice(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}
module.exports = {
    RegisterController,
    LoginController,
    verifycontroller,
    resendOTPController,
    resetPasswordCheckUserController,
    resetPasswordCheckUserOtpVerifyController,
    resetpasswordController
}