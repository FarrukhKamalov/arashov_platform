const router = require('express').Router();
const lessonController = require("../controllers/lesson.controller");
const { verifyToken, verifyTokenAndAuthorization } = require('../middleware/verifyToken');

router.get("/", verifyToken, async (req, res) => {
    try {
        await lessonController.GetAllLesson(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
});

router.get("/:id", verifyToken,  async (req, res) => {
    try {
        await lessonController.getByIdLesson(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
});



router.patch("/:id", async (req, res) => {
    try {
        await lessonController.updateLesson(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
});


router.post("/add", async (req, res) => {
    try {
        await lessonController.CreateLesson(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
});


module.exports = router