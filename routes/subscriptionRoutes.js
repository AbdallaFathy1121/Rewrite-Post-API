const { Router } = require("express");
const userSubscriptionController = require("../controllers/userSubscriptionsConteroller");

const router = Router();

//Get Routes
router.get("/all", userSubscriptionController.getAllSubscriptions);
router.get("/allUserSubscriptions", userSubscriptionController.getAllUserSubscriptions);
router.get("/:id", userSubscriptionController.getSubscriptionById);
router.post("/assignUserIntoSubscription", userSubscriptionController.assignUserIntoUserSubscription);
router.post("/update", userSubscriptionController.updateUserSubscriptionById);

module.exports = router;