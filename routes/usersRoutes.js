const { Router } = require("express");
const usersController = require("../controllers/usersController");

const router = Router();

//Get Routes
router.get("/all", usersController.getAll);
router.get("/:email", usersController.getByEmail);
router.get("/token/:token", usersController.getByToken);
router.post("/add", usersController.addUser);
router.post("/update", usersController.UpdateUserSubscriptionIdById);

module.exports = router;