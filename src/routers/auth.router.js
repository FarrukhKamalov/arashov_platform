const AuthController = require("../controllers/auth.controller");
const router = require("express").Router();


router.post("/register", async(req,res) => {
    await AuthController.RegisterController(req,res);
})


router.post("/login", async(req,res)=> {
    await AuthController.LoginController(req,res);
})


module.exports = router;