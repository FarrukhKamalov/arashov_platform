const requestController = require("../controllers/request.controller");
const router = require('express').Router();


router.get('/', async(req,res)=> {
    try {
        await requestController.getAllRequestsController(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
});

router.post('/', async(req,res)=>{
    try {
        await requestController.createRequestController(req,res);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        })
    }
});

router.delete('/:id', async(req,res)=> {
    try {
        await requestController.deleteRequestController(req,res);
    } catch (error) {
        res.status(500).json({
        
        })
    }
})


module.exports = router