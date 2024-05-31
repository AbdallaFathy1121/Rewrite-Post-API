const { Router } = require("express");
const addUserController = require("../controllers/usersController");

const router = Router();

//Get Routes
router.post("/add", addUserController.addUser);

module.exports = router;