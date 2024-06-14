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

//API TO Get User Subscription By Id
module.exports.getUserSubscriptionById = async (req, res) => {
    const { id } = req.params;
    try {
        await dbUserSubscriptionOperations.getUserSubscriptionById(id).then(result =>{
            res.status(200).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};

//API TO Get User Subscriptions By UserId
module.exports.getUserSubscriptionsByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        await dbUserSubscriptionOperations.getUserSubscriptionByUserId(id).then(result =>{
            res.status(200).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};


//API TO Update UserSubscription By Id
module.exports.updateUserSubscriptionById = async (req, res) => {
    const { id, status, days } = req.body;
    try {
        await dbUserSubscriptionOperations.updateUserSubscriptionById(id, status, days).then(result =>{
            res.status(200).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};

//API TO Update UserSubscription By Id
module.exports.changeCreditsUserSubscription = async (req, res) => {
    const { id, postCredits } = req.body;
    try {
        await dbUserSubscriptionOperations.changePostCreditsUserSubscriptionById(id, postCredits).then(result =>{
            res.status(200).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};


//API TO Get All Subscriptions 
module.exports.getAllSubscriptions = async (req, res) => {
    try {
        await dbUserSubscriptionOperations.getAllSubscriptions().then(result =>{
            res.status(200).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};

//API TO Get All UserSubscriptions 
module.exports.getAllUserSubscriptions = async (req, res) => {
    try {
        await dbUserSubscriptionOperations.getAllUserSubscriptions().then(result =>{
            res.status(200).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};

//API TO Assign User Into User Subscription
module.exports.assignUserIntoUserSubscription = async (req, res) => {
    const { userId, subscriptionId, phoneNumber } = req.body;
    let subscription;
    await dbUserSubscriptionOperations.getSubscriptionById(subscriptionId).then(result =>{
        subscription = result.data;
    })

    let isFree = false;
    if (subscription.price < 1) {
        isFree = true;
    }

    try {
        await dbUserSubscriptionOperations.assignIntoUserSubscription(userId, subscriptionId, subscription.days, subscription.postCredits, isFree, phoneNumber).then(result =>{
            res.status(201).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};


