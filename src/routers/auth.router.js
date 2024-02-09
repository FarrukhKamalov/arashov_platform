const AuthController = require("../controllers/auth.controller");
const router = require("express").Router();


router.post("/register", async(req,res) => {
    await AuthController.RegisterController(req,res);
})


router.post("/verify", async(req,res)=> {
    await AuthController.verifycontroller(req,res)
})

router.post("/login", async(req,res)=> {
    await AuthController.LoginController(req,res);
});

router.post("/resendotp", async(req,res)=>{
    await AuthController.resendOTPController(req,res);
})

router.post("/forgetpassword", async(req,res)=>{
    await AuthController.resetPasswordCheckUserController(req,res);
})

router.post("/resetpasswordotp", async(req,res)=>{
    await AuthController.resetPasswordCheckUserOtpVerifyController(req,res)
})

router.post("/resetpassword", async(req,res)=>{
    await AuthController.resetpasswordController(req,res)
})

module.exports = router;