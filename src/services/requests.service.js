const requestSchema = require("../models/request.model");

const getAllRequestsService = async(req,res) => {
    try {   
        const requests = await requestSchema.find().sort({createdAt: -1});
        res.status(200).json({
            status: true,
            data: requests
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
}

const postRequestService = async(req,res)=>{
    try {
        const newRequest = await requestSchema.create(req.body);
        await newRequest.save();
        res.status(201).json({
            status: true,
            data: newRequest
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            data: error.message
        })
    }
}

const deleteRequestService = async(req,res) => {
    try {
        await requestSchema.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({
            status: true,
            data: "Request delete"
        });
    } catch (error) {
        res.status(500).json({
            status:false,
            data: error.message
        })
    }
}

module.exports = {
    postRequestService,
    getAllRequestsService,
    deleteRequestService
}