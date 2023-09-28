const PostService = require("../services/post.service");


const AllPostController = async(req,res)=>{
    try {
        await PostService.GetAllPostService(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}


const CreatePostController = async(req,res) => {
    try {
        await PostService.CreatePostService(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const UpdatePostController = async(req,res) => {
    try {
        await PostService.PostUpdateService(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}


const DeletePostController = async(req,res) => {
    try {
        await PostService.PostDeleteService(req,res)
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const getByIdPostController = async(req,res)=>{
    try {
        await PostService.GetByIdPostService(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

module.exports = {
    CreatePostController,
    AllPostController,
    UpdatePostController,
    DeletePostController,
    getByIdPostController
}