const UserModel = require("../models/students.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer")

// const sendOTPService = async(req,res)=>{
//     try {
//         const {email} = req.body;
//         const transporter = nodemailer.createTransport({
//             service: "smtp.gmail.com",
//             auth: {
//                 user: process.env.AUTH_EMAIL,
//                 pass: process.env.AUTH_PASS
//             }
//         });
        
//         const mailOptions = {
//             from: process.env.AUTH_EMAIL,
//             to: email,
//             subject: "sending Email with react and nodejs",
//             html: `<h1>Your Otp Code:</h1>`
//         }

//         transporter.sendMail(mailOptions, (error, info)=>{
//             if(error){
//                 console.log("Error: ",error);
//             }
//             console.log(`Email sent: ${info?.response}`);
//             res.status(201).json({status: 201, info});
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             data: error.message
//         })
//     }
// }

const RegisterService = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        console.log(password)
        const emailValidate = await UserModel.findOne({ email: email });
        if (emailValidate) return res.json({ success: false, data: "Bunday foydalanuvchi bor" });

        const salt = await bcrypt.genSalt(10);
        const pswHash = await bcrypt.hash(password, salt);

        const user = new UserModel({
            fullName: fullName,
            email: email,
            password: pswHash,
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

        const emailValidate = await UserModel.findOne({ email: email });
        if (!emailValidate) return res.json({ success: false, data: "Bunday foydalanuvchi yoq" });


        const ValidPass = await bcrypt.compare(password, emailValidate.password)
        if (!ValidPass) return res.json({
            success: false,
            data: 'Parol noto`gri kiritldi'
        })
        const token = jwt.sign({ _id: emailValidate._id }, process.env.JWT_SECRET, { expiresIn: '2d' })

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
    LoginService,
    
}