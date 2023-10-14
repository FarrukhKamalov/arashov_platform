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


module.exports = router;