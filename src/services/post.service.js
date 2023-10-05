const postModel = require('../models/post.model.js');

const GetAllPostService = async(req,res)=> {
    try {
        const posts = await postModel.find().sort({createdAt: -1});
        res.status(200).json({
            success: true,
            data: posts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}


const CreatePostService = async(req,res)=>{
    try {
        const newPost = await postModel.create(req.body);
        await newPost.save();
        res.status(201).json({
            success: true,
            data: `CREATED POST: ${newPost}`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}


const PostUpdateService = async(req,res)=>{
    try {
        const UpdatePost = await postModel.findByIdAndUpdate({_id: req.params.id}, {
            $set: req.body
        }, {new: true});


        res.status(200).json({
            success: true,
            data: `${UpdatePost.postText ? UpdatePost.postText : UpdatePost.postImage} update boldi`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const PostDeleteService = async(req,res) => {
    try {
        const {id} = req.params;
        await postModel.findByIdAndDelete({_id: id});
        res.status(200).json({
            success: true,
            data: 'Deleted'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const GetByIdPostService = async(req,res) => {
    try {
        const {id}=req.params;
        const post = await postModel.findById({_id: id});
        res.status(200).json({
            success: true,
            data: post
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data:error.message
        })
    }
}


const likePostService = async(req,res)=> {
    try {
     await postModel.findByIdAndUpdate(req.params.id, {
            $push: {
                likes: req.user._id
            }
        }, {new: true})
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}

module.exports = {
    CreatePostService,
    GetAllPostService,
    PostUpdateService,
    PostDeleteService,
    GetByIdPostService,
    likePostService
}