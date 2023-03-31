const {deleteBlogService, AddBlogService, BlogUpdateService, GetAllBlogService, GetByIdBlogService} = require("../services/blogs.service");
const {StudentsAllGetService, UpdateStudentService, StudentGetById, studentDelete} = require("../services/student.service");
const {LessonDeleteService, LessonAddService, LessonsGetService, LessonGetByIdService, LessonUpdateService} = require("../services/lesson.service");


const getAllCourse  = async(req,res) => {
    try {
        await LessonsGetService(req,res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getbyIdCourse  = async(req,res) => {
    try {
        await LessonGetByIdService(req,res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const courseUpdate = async(req,res)=>{
    try{
        await LessonUpdateService(req,res);
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const courseDelete = async(req,res) => {
    try {
        await LessonDeleteService(req,res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


const courseAdd = async(req,res)=>{
    try {
        await LessonAddService(req,res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}



const getStudents = async(req,res) => {
    try {
        await StudentsAllGetService(req,res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getStudentUpdate = async(req,res)=>{
    try {
        await UpdateStudentService(req,res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


const getByIdStudent = async(req,res)=>{
    try {
        await StudentGetById(req,res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


const deleteByIdStudent = async(req,res)=>{
    try {
        await studentDelete(req,res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}




module.exports = {
    getStudentUpdate,
    courseAdd,
    courseDelete,
    getStudents,
    getbyIdCourse,
    getAllCourse,
    courseUpdate,
    getByIdStudent,
    deleteByIdStudent
}