const blogModel = require('../models/blog.model');
const BlogSchema = require('../models/blog.model');

const GetAllBlogService = async(req,res)=> {
    try {
        const blogs = await BlogSchema.find().sort({createdAt: -1});
        res.status(200).json({
            success: true,
            data: blogs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const GetByIdBlogService = async(req,res) => {
    try {
        const blog = await BlogSchema.findById({_id: req.params.id});
        res.status(200).json({
            success: true,
            data: blog
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const deleteBlogService = async(req,res)=>{
    try {
        const deleteBlog = await BlogSchema.findByIdAndDelete({_id: req.params.id});
        res.status(500).json({
            success: false,
            data: `${deleteBlog.title} o'chirildi`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
};


const BlogUpdateService = async(req,res)=>{
    try {
        const UpdateBlog = await BlogSchema.findByIdAndUpdate({_id: req.params.id}, {
            $set: req.body
        }, {new: true});


        res.status(200).json({
            success: true,
            data: `${UpdateBlog.title} update boldi`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}


const AddBlogService = async(req,res)=>{
    try {
        const BlogAdd = new blogModel(req.body);
        BlogAdd.save();

        res.status(201).json({
            success: true,
            data: BlogAdd
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

module.exports = {
    GetAllBlogService,
    GetByIdBlogService,
    deleteBlogService,
    BlogUpdateService
}