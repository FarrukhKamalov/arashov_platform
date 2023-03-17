const studentService = require("../services/student.service");


const getAllStudentController = async(req,res)=> {
    try {
        
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}