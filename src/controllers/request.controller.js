const requestService = require("../services/requests.service");


const createRequestController = async(req,res) => {
    try {
        await requestService.postRequestService(req,res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}


const getAllRequestsController = async(req,res)=>{
    try {
        await requestService.getAllRequestsService(req,res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}

const deleteRequestController = async(req,res) => {
    try {
        await requestService.deleteRequestService(req,res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
}


module.exports = {
    createRequestController,
    getAllRequestsController,
    deleteRequestController
}