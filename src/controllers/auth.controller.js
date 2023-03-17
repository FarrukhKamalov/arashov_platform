const UserService = require("../services/student.service");

const RegisterController = async (req, res) => {
    try {
        await UserService.RegisterService(req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}



const LoginController = async (req, res) => {
    try {
        await UserService.LoginService(req, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}


module.exports = {
    RegisterController,
    LoginController
}