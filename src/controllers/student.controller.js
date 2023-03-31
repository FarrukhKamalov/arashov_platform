const studentService = require("../services/student.service");


const getStudentMe = async(req,res)=> {
    try {
        await studentService.StudentProfilSeervice(req,res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}

module.exports  = {getStudentMe}