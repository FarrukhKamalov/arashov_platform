const UserModel = require("../models/students.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");


const referralCodeGenerator = async () => {
    try {
        return Math.random().toString(36).substring(2, 9).toUpperCase()
    } catch (error) {
        console.log("ReferralCodeGeneratorError: ", error.message)
    }
}

const sendOTPEmail = async (email) => {
    try {
        const otp = Math.floor(10000 + Math.random() * 100000);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.NODEMAILER_AUTH_PASS
            },
        });

        transporter.sendMail({
            from: `"arashov.uz" <Arashov@gmail.com>`,
            to: email,
            subject: "Elektron pochtani tasdiqlash",
            html: `
            <div style="width: 350px; height: 459px; background: #1C1C1F; border-radius: 23px; border: 2px #37393E solid; color: white;">
  <img src="https://res.cloudinary.com/file-upload/image/upload/v1697895687/Email_1_snoi8h.png" width="347" style="height: 45px; border-radius: 22px 22px 0 0">
  <div style="padding: 10px 20px; margin: 0 auto; font-family: Helvetica,Arial,sans-serif;">
    <div style="color: white;">
      <h2 style="font-weight: 500; font-size: 20px;">Assalomu aleykum!</h2>
      <p style="font-size: 15px;">Akademiyamizdan foydalanib akkaunt yaratganingiz uchun tashakkur.</p>
      <p style="font-size: 15px;">
        Ro'yxatdan o'tishni yakunlash uchun tasdiqlash kodingiz
      </p>
      <code style="font-size: 25px; padding-left: 15px;"><b>${otp}</b></code>
       <br/>
      <p>Ushbu kodni hech kimga ulashmang.</p>
      <hr style="width: 80%; opacity: 0.2;">
      <div style="display: flex; justify-content: space-around; align-items: center; ">
          <a href="">
              <img src="https://seeklogo.com/images/D/download-on-the-app-store-flat-badge-logo-4582694404-seeklogo.com.png" width="100px" height="34px">
          </a>
        <a href="">
          <img src="https://seeklogo.com/images/G/get-it-on-google-play-badge-logo-8CDE582776-seeklogo.com.png" width="100px" height="34px">
        </a>
      </div>
      <p style="font-size: 13px; margin-top: 40px;">Har qanday savol yoki taklif uchun <a style="text-decoration:none; color: #0094ff;" href="https://mail.google.com/mail/u/0/?fs=1&to=arashovacademy@gmail.com&tf=cm">arashovacademy@gmail.com</a> manziliga yozing</p>
    </div>

  </div>
</div>
            `
        }).then(async (result) => {
            await UserModel.findOneAndUpdate({ email: email }, {
                $set: {
                    otpcode: otp
                }
            });
        }).catch(err => {
            console.log(err);
        });
    } catch (err) {
        console.log(err)
    }
};




const RegisterService = async (req, res) => {
    try {
        const { email, password, fullName, ref } = req.body;
       
        const emailValidate = await UserModel.findOne({ email: email });
        if (emailValidate) return res.json({ success: false, data: "Bunday foydalanuvchi bor" });


        const salt = await bcrypt.genSalt(10);
        const pswHash = await bcrypt.hash(password, salt);






        let referredByUser = null;
        if (ref) {
            referredByUser = await UserModel.findOne({ referralCode: ref });
            if (!referredByUser) {
                return res.status(400).json({
                    success: false,
                    data: "Invalid Referral code."
                })
            }

            const user = new UserModel({
                fullName: fullName,
                email: email,
                password: pswHash,
                referralCode: await referralCodeGenerator(),
                referred_code: referredByUser.referralCode    
            });

            await user.save();
            await sendOTPEmail(email);
            res.status(201).json({
                success: true,
                data: user
            });
        }else{
            const user = new UserModel({
                fullName: fullName,
                email: email,
                password: pswHash,
                referralCode: await referralCodeGenerator()
            });
            await user.save();    
            await sendOTPEmail(email);

            res.status(201).json({
                success: true,
                data: user
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const verifyOTPservice = async (req, res) => {
    try {
        const { otp, email } = req.body;
        const user = await UserModel.findOne({ email });
        if (otp == user.otpcode) {
            user.verified = true
            await user.save()
            return res.status(200).json({
                success: true,
                data: "otp togri"
            })
        }

        return res.status(500).json({
            success: false,
            data: "otp notogri"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const resendVerifyOTPService = async(req,res)=>{
    try {
        const { email } = req.body;
        sendOTPEmail(email);
        res.status(200).json({
            success: true,
            data: "Qayta yuborildi"
        })
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
        const token = jwt.sign({ _id: emailValidate._id }, process.env.JWT_SECRET, {})

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
    verifyOTPservice,
    resendVerifyOTPService
}