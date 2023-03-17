const BlogService = require("../services/blogs.service");


const AllBlogController = async(req,res)=>{
    try {
        await BlogService.GetAllBlogService(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}


const GetByIdBlogController = async(req,res)=>{
    try {
        await BlogService.GetByIdBlogService(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const UpdateBlogController = async(req,res) => {
    try {
        await BlogService.BlogUpdateService(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const deleteBlogController = async(req,res)=>{
  try {
    await BlogService.deleteBlogService(req,res);
  } catch (error) {
    res.status(500).json({
        success: false,
        data: error.message
    })
  }
}

module.exports = {
    AllBlogController,
    GetByIdBlogController,
    UpdateBlogController,
    deleteBlogController,
}