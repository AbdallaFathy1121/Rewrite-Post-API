const { Router } = require("express");
const userSubscriptionController = require("../controllers/userSubscriptionsConteroller");

const router = Router();

//Get Routes
router.get("/:id", userSubscriptionController.getSubscriptionById);
router.post("/assignUserIntoSubscription", userSubscriptionController.assignUserIntoUserSubscription);

module.exports = router;