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
        const otp = Math.floor(Math.random() * 100000);

        const transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.email",
            // host: "smtp.gmail.com",
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
            subject: "Send OTP",
            html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Arashov.uz</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Thank you for choosing Arashov.uz. Use the following OTP to complete your Sign Up procedures. OTP: </p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
              <p style="font-size:0.9em;">Regards,<br />Arashov.uz</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Arashov.uz Inc</p>
                <p>Tashkent, Uzbekiston</p>
              </div>
            </div>
          </div></p>`
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
        const { email, password, fullName } = req.body;
        const { ref } = req.query
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
    verifyOTPservice
}