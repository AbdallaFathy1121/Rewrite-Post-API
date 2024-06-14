const { Router } = require("express");
const userSubscriptionController = require("../controllers/userSubscriptionsConteroller");
const jwtMiddleWares = require('../middlewares/jwt');

const router = Router();

//Get Routes
router.get("/all", jwtMiddleWares.authenticateJWT, userSubscriptionController.getAllSubscriptions);
router.get("/allUserSubscriptions", jwtMiddleWares.authenticateJWT, userSubscriptionController.getAllUserSubscriptions);
router.get("/userSubscription/:id", jwtMiddleWares.authenticateJWT, userSubscriptionController.getUserSubscriptionById);
router.get("/userSubscriptionByUserId/:id", jwtMiddleWares.authenticateJWT, userSubscriptionController.getUserSubscriptionsByUserId);
router.get("/:id", jwtMiddleWares.authenticateJWT, userSubscriptionController.getSubscriptionById);

// Post Routes
router.post("/assignUserIntoSubscription", userSubscriptionController.assignUserIntoUserSubscription);
router.post("/update", userSubscriptionController.updateUserSubscriptionById);
router.post("/changePostCredits", jwtMiddleWares.authenticateJWT, userSubscriptionController.changeCreditsUserSubscription);

module.exports = router;