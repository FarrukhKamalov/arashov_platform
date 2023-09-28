const UserModel = require("../models/students.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const RegisterService = async (req, res) => {
    try {
        const { email, phone, password, fullName } = req.body;

        const emailValidate = await UserModel.findOne({email: email});
        if(emailValidate) return res.json({success: false, data:  "Bunday foydalanuvchi bor"});

        const salt = await bcrypt.genSalt(10);
        const pswHash = await bcrypt.hash(password, salt);

        const user = new UserModel({
            email: email,
            phone: phone,
            password: pswHash,
            fullName: fullName
        }) 

        await user.save();
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}


const LoginService = async (req, res) => {
    try {
        const { email, password } = req.body;

        const emailValidate = await UserModel.findOne({email: email});
        if(!emailValidate) return res.json({success: false, data:  "Bunday foydalanuvchi yoq"});

        
        const ValidPass = await bcrypt.compare(password, emailValidate.password)
        if(!ValidPass) return res.json({
            success: false,
            data: 'Parol noto`gri kiritldi' 
        })
        const token = jwt.sign({_id: emailValidate._id}, process.env.JWT_SECRET,{expiresIn: '2d'})
      
        res.status(200).json({
            success: true,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

module.exports = {
    RegisterService,
    LoginService
}