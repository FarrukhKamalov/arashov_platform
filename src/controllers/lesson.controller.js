const lessonService = require("../services/lesson.service");


const GetAllLesson = async(req,res) => {
    try {
        await lessonService.LessonsGetService(req,res)
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}


const CreateLesson = async(req,res)=>{
    try {
        await lessonService.LessonAddService(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}


const getByIdLesson = async(req,res)=> {
    try {
        await lessonService.LessonGetByIdService(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}


const deleteLesson = async(req,res)=>{
    try {
        await lessonService.LessonDeleteService(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const updateLesson = async(req,res)=>{
    try {
        await lessonService.LessonUpdateService(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}



module.exports = {
    getByIdLesson, 
    updateLesson,
    deleteLesson,
    CreateLesson,
    GetAllLesson
}