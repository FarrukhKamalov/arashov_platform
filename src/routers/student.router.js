const {getStudentMe} = require("../controllers/student.controller");
const { verifyTokenAndAuthorization, verifyToken } = require("../middleware/verifyToken");
const router = require("express").Router();



router.get('/me', verifyToken, async(req,res)=>{    
    try {
        await getStudentMe(req,res)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})





module.exports = router