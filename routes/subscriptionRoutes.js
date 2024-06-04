const { Router } = require("express");
const userSubscriptionController = require("../controllers/userSubscriptionsConteroller");
const jwtMiddleWares = require('../middlewares/jwt');

const router = Router();

//Get Routes
router.get("/all", jwtMiddleWares.authenticateJWT, userSubscriptionController.getAllSubscriptions);
router.get("/allUserSubscriptions", jwtMiddleWares.authenticateJWT, userSubscriptionController.getAllUserSubscriptions);
router.get("/:id", jwtMiddleWares.authenticateJWT, userSubscriptionController.getSubscriptionById);

// Post Routes
router.post("/assignUserIntoSubscription", jwtMiddleWares.authenticateJWT, userSubscriptionController.assignUserIntoUserSubscription);
router.post("/update", jwtMiddleWares.authenticateJWT, userSubscriptionController.updateUserSubscriptionById);

module.exports = router;