const { withdrawGetController, withdrawPostController, withdrawDeleteController } = require("../controllers/withdraw.controller");

const router = require("express").Router();

router.get('/', async(req,res)=>{
    try {
        await withdrawGetController(req,res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.post('/', async(req,res)=> {
    try {
        await withdrawPostController(req,res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.delete('/:id', async(req,res)=>{
    try {
        await withdrawDeleteController(req,res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

module.exports = router;