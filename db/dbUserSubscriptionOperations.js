const config = require('./dbconfig');
const sql = require('mssql');

async function getSubscriptionById(id){
    try{
        let pool = await sql.connect(config);
        let subscription = await pool.request()
        .input("input_id", sql.Int, id)
        .query('Select * from Subscriptions s where s.id = @input_id');

        // Response
        const model = subscription.recordsets[0][0];
        let result;
        if (model != null) {
            result = {
                isSuccess: true,
                errors: [],
                message: "",
                data: {
                    id: model.Id,
                    name: model.Name,
                    days: model.Days,
                    postCredits: model.PostCredits,
                    price: model.Price
                }
            };
        }
        else {
            result = {
                isSuccess: false,
                errors: [],
                message: "لا يوجد اشتراك",
                data: {}
            };
        }
        return result;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

async function assignIntoUserSubscription(userId, subscriptionId, duration, postCredits, isFree = false){
    try{
        const dateNow = new Date();
        // Add 5 days to the current date
        const endDate = new Date(dateNow);
        endDate.setDate(dateNow.getDate() + duration);

        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('input_userId',sql.NVarChar,userId)
        .input('input_subscriptionId',sql.Int,subscriptionId)
        .input('input_postCreditsRemaining',sql.Int,postCredits)
        .input('input_status',sql.Bit, isFree)
        .input('input_startDate',sql.DateTime,dateNow)
        .input('input_endDate',sql.DateTime,endDate)
        .query("Insert INTO UserSubscriptions (userId, SubscriptionId, postCreditsRemaining, status,startDate, endDate) VALUES (@input_userId, @input_subscriptionId, @input_postCreditsRemaining, @input_status, @input_startDate, @input_endDate)");

        const result = {
            isSuccess: true,
            errors: [],
            message: "تم أضافة ال   باقة المجانية بنجاح",
            data: {}
        };

        return result;
    }
    catch(error){
        throw error;
    }
} 

module.exports = {
    assignIntoUserSubscription: assignIntoUserSubscription,
    getSubscriptionById: getSubscriptionById
}