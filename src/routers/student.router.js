const {getStudentMe, getStudentmeEdit} = require("../controllers/student.controller");
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


router.patch('/me/edit', verifyToken, async(req,res)=> {
    try {
        await getStudentmeEdit(req,res)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.get('/me/referral', verifyToken, async(req,res)=> {
    try {
        
    } catch (error) {
        res.status(500).json()
    }
})


module.exports = router
