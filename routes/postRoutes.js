const { Router } = require("express");
const postController = require("../controllers/postController");
const jwtMiddleWares = require('../middlewares/jwt');

const router = Router();

// Post Routes
router.post("/add", jwtMiddleWares.authenticateJWT, postController.AddPost);

module.exports = router;