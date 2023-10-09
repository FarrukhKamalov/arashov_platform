const studentModel = require('../models/students.model');



const StudentsAllGetService = async (req, res) => {
    try {
        const students = await studentModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: true,
            data: students
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}

const GetStudentMeDataService = async (req, res) => {
    try {
        const student = await studentModel.findById({ _id: req.params.id });
        res.status(200).json({
            status: true,
            data: student
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}

const UpdateStudentService = async (req, res) => {
    try {
        const student = await studentModel.findByIdAndUpdate({ _id: req.params.id }, {
            $set: req.body
        })
        res.status(200).json({
            status: true,
            data: student
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}

const UserReferralService = async (req, res) => {
    try {
        const userReferred = await studentModel.findById({ _id: req.user._id });
        const referralUsers = await studentModel.find({ referred_code: userReferred.referralCode });
        if (referralUsers.length) {
            referralUsers.map(async user => {
                if (user.payment == true) {
                    userReferred.wallet += 50;
                    await userReferred.save()
                }
            })
        }
        res.status(200).json({
            status: true,
            data: referralUsers
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}

const ClientStudentUpdateService = async (req, res) => {
    try {
        const oldData = await studentModel.findById({ _id: req.user._id });
        const student = await studentModel.findByIdAndUpdate({ _id: req.user._id }, {
            $set: {
                fullName: req.body.fullName ? req.body.fullName : oldData.fullName,
                email: req.body.email ? req.body.email : oldData.email,
                phone: req.body.phone ? req.body.phone : oldData.phone,
            }
        });

        res.status(200).json({
            status: true,
            data: student
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}


const studentDelete = async (req, res) => {
    try {
        const student = await studentModel.findOneAndDelete({ _id: req.params.id });

        res.status(200).json({
            status: true,
            data: `${student} - DELETE`
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}

const StudentGetById = async (req, res) => {
    try {
        const student = await studentModel.findById({ _id: req.params.id });
        res.status(200).json({
            status: true,
            data: student
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


const StudentProfilSeervice = async (req, res) => {
    try {
        const student = await studentModel.findById({ _id: req.user._id });

        res.status(200).json({
            status: true,
            data: student
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    StudentsAllGetService,
    GetStudentMeDataService,
    UpdateStudentService,
    StudentGetById,
    studentDelete,
    StudentProfilSeervice,
    ClientStudentUpdateService,
    UserReferralService
}
