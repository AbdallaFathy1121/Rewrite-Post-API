const { Router } = require("express");
const usersController = require("../controllers/usersController");
const jwtMiddleWares = require('../middlewares/jwt');

const router = Router();

//Get Routes
router.get("/all", jwtMiddleWares.authenticateJWT, usersController.getAll);
router.get("/:email", usersController.getByEmail);

// Post Routes
router.post("/add", usersController.addUser);
router.post("/update", usersController.UpdateUserSubscriptionIdById);
router.post("/login", usersController.login);

module.exports = router;