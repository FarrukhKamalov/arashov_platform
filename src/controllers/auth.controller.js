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

const OTPService = async(req,res)=>{
    try {
        await AuthService.sendOTPService(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
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


module.exports = {
    RegisterController,
    LoginController,
    OTPService
}