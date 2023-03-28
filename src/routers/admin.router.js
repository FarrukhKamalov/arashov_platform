const adminController = require("../controllers/admin.controller");
const  router = require("express").Router();

router.get("/courses", async(req,res)=> {
    try{
        await adminController.getAllCourse(req,res);
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
})


router.get("/courses/:id", async(req,res)=> {
    try{
        await adminController.getbyIdCourse(req,res);
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
})


router.delete("/courses/:id", async(req,res)=> {
    try{
        await adminController.courseDelete(req,res);
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
})


router.patch("/courses/:id", async(req,res)=>{
    try {
        await adminController.courseUpdate(req,res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.get("/students", async(req,res)=> {
    try{
        await adminController.getStudents(req,res);
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
})


router.patch('/students/:id', async(req,res)=>{
    try {
        await adminController.getStudentUpdate(req,res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

router.get('/students/:id', async(req,res)=>{
    try {
        await adminController.getByIdStudent(req,res);
    }catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})



module.exports = router;