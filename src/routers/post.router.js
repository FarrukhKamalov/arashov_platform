const router = require('express').Router();
const postController = require("../controllers/post.controller");
const { verifyToken } = require('../middleware/verifyToken');

router.get("/", async (req, res) => {
    try {
        await postController.AllPostController(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
});



router.delete("/:id", async (req, res) => {
    try {
        await postController.DeletePostController(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
});

router.patch("/:id", async (req, res) => {
    try {
        await postController.UpdatePostController(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
});


router.post("/add", async (req, res) => {
    try {
        await postController.CreatePostController(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        await postController.getByIdPostController(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
})


router.patch('/:id/like', verifyToken, async(req,res)=>{
    try {
       await postController.likePostController(req,res);
    } catch (error) {
        res.status(500).json({
            status: false, 
            data: error.message
        })
    }
})
module.exports = router;