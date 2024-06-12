const { Router } = require("express");
const postController = require("../controllers/postController");

const router = Router();

// Post Routes
router.post("/add", postController.AddPost);

module.exports = router;