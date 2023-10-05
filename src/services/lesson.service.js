const Lesson = require('../models/lessons.model.js');



const LessonAddService = async(req,res)=> {
    try{
        console.log(req.body)
        const lesson =  await Lesson(req.body);
        console.log(lesson)
        lesson.save();

        res.status(201).json({
            success: true,
            data: lesson
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const LessonsGetService = async(req,res)=> {
    try{
        const lessons =  await Lesson.find()

        res.status(200).json({
            success: true,
            data: lessons
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const LessonGetByIdService = async(req,res)=> {
    try{
        const lesson =  await Lesson.findById({_id: req.params.id});

        res.status(201).json({
            success: true,
            data: lesson
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const LessonDeleteService = async(req,res)=> {
    try{
        const LessonDelete =  await Lesson.findByIdAndDelete({_id: req.params.id})

        res.status(201).json({
            success: true,
            data: LessonDelete.videoTitle
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const LessonUpdateService = async(req,res)=> {
    try{
        const lesson =  await Lesson.findByIdAndUpdate({_id: req.params.id}, {
            $set: req.body
        })

        res.status(201).json({
            success: true,
            data: lesson
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    LessonAddService,
    LessonsGetService,
    LessonGetByIdService,
    LessonDeleteService,
    LessonUpdateService
};
