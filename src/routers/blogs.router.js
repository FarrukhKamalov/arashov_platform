const router = require('express').Router();
const blogController = require("../controllers/blog.controller");

router.get("/", async (req, res) => {
    try {
        await blogController.AllBlogController(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
});

router.get("/:id", async (req, res) => {
    try {
        await blogController.GetByIdBlogController(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await blogController.deleteBlogController(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
});

router.patch("/:id", async (req, res) => {
    try {
        await blogController.UpdateBlogController(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
});


router.post("/add", async (req, res) => {
    try {
        await blogController.createBlogController(req, res);
    } catch (error) {
        res.status(500).json({
            status: false,
            data: error.message
        })
    }
});


module.exports = router