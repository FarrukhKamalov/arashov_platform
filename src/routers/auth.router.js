const UserController = require("../controllers/student.controller");
const router = require("express").Router();


router.post("/register", async(req,res) => {
    await UserController.RegisterController(req,res);
})


router.post("/login", async(req,res)=> {
    await UserController.LoginController(req,res);
})


module.exports = router;