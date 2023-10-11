const { withdrawPostService, withdrawGetService } = require("../services/student.service")

const withdrawPostController = async(req,res)=>{
    try {
        await withdrawPostService(req,res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}


const withdrawGetController = async(req,res)=>{
    try {
        await withdrawGetService(req,res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}


module.exports = {
    withdrawGetController,
    withdrawPostController
}