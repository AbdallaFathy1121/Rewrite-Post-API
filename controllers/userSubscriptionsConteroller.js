const dbUserSubscriptionOperations = require('../db/dbUserSubscriptionOperations');

//API TO Get Subscription By Id
module.exports.getSubscriptionById = async (req, res) => {
    const { id } = req.params;
    try {
        await dbUserSubscriptionOperations.getSubscriptionById(id).then(result =>{
            res.status(200).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};

//API TO Add User
module.exports.assignUserIntoUserSubscription = async (req, res) => {
    const { userId, subscriptionId } = req.body;
    let subscription;
    await dbUserSubscriptionOperations.getSubscriptionById(subscriptionId).then(result =>{
        subscription = result.data;
    })

    let isFree = false;
    if (subscription.price < 1) {
        isFree = true;
    }

    try {
        await dbUserSubscriptionOperations.assignIntoUserSubscription(userId, subscriptionId, subscription.days, subscription.postCredits, isFree).then(result =>{
            res.status(201).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};


