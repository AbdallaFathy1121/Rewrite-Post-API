const config = require("./dbconfig");
const sql = require("mssql");

// Function To Get All Subscriptions
async function getAllSubscriptions() {
  try {
    let pool = await sql.connect(config);
    let subscription = await pool
      .request()
      .query("Select * from Subscriptions");

    // Response
    const model = subscription.recordsets[0];
    let result;
    if (model != null) {
      result = {
        isSuccess: true,
        errors: [],
        message: "",
        data: model,
      };
    } else {
      result = {
        isSuccess: false,
        errors: [],
        message: "لا يوجد اشتراكات",
        data: {},
      };
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Function To Get Subscription By Id
async function getSubscriptionById(id) {
  try {
    let pool = await sql.connect(config);
    let subscription = await pool
      .request()
      .input("input_id", sql.Int, id)
      .query("Select * from Subscriptions s where s.id = @input_id");

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
          price: model.Price,
        },
      };
    } else {
      result = {
        isSuccess: false,
        errors: [],
        message: "لا يوجد اشتراك",
        data: {},
      };
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Function To Get User Subscription By Id
async function getUserSubscriptionById(id) {
  try {
    let pool = await sql.connect(config);
    let subscription = await pool
      .request()
      .input("input_id", sql.Int, id)
      .query("Select * from UserSubscriptions s where s.id = @input_id");

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
          userId: model.UserId,
          subscriptionId: model.SubscriptionId,
          postCredits: model.PostCreditsRemaining,
          status: model.Status,
          startDate: model.StartDate,
          endDate: model.EndDate,
          phoneNumber: model.PhoneNumber
        },
      };
    } else {
      result = {
        isSuccess: false,
        errors: [],
        message: "لا يوجد اشتراك",
        data: {},
      };
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Function To Get Update UserSubscription By Id
async function updateUserSubscriptionById(id, status, days) {
  try {
    const dateNow = new Date();
    // Add 5 days to the current date
    const endDate = new Date(dateNow);
    endDate.setDate(dateNow.getDate() + days);

    let pool = await sql.connect(config);
    let subscription = await pool
      .request()
      .input("input_startDate", sql.DateTime, dateNow)
      .input("input_endDate", sql.DateTime, endDate)
      .input("input_status", sql.NVarChar, status)
      .query(
        `UPDATE userSubscriptions SET Status = @input_status, StartDate = @input_startDate, EndDate = @input_endDate WHERE Id = ${id}`
      );

    let result = {
      isSuccess: true,
      errors: [],
      message: "تم تعديل التفعيل بنجاح",
      data: {},
    };
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Function To Change PostCredits User Subscription By Id
async function changePostCreditsUserSubscriptionById(id, postCredits) {
  try {
    let pool = await sql.connect(config);
    let subscription = await pool
      .request()
      .input("input_postCredits", sql.Int, postCredits)
      .query(
        `UPDATE userSubscriptions SET PostCreditsRemaining = @input_postCredits WHERE Id = ${id}`
      );

    let result = {
      isSuccess: true,
      errors: [],
      message: "تم التعديل بنجاح",
      data: {},
    };
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


// Function To Get All UserSubscriptions
async function getAllUserSubscriptions() {
  try {
    let pool = await sql.connect(config);
    
    let subscription = await pool.request().query(`
        select us.Id, us.UserId, us.SubscriptionId, us.Status, us.PostCreditsRemaining, s.Days, us.StartDate, us.EndDate, u.picture, u.Name as UserName, s.Name as SubscriptionName, s.PostCredits, s.Price
        from UserSubscriptions us
        left join users u on u.Id = us.UserId
        left join Subscriptions s on s.Id = us.SubscriptionId`);

    // Response
    const model = subscription.recordsets[0];
    let result;
    if (model != null) {
      result = {
        isSuccess: true,
        errors: [],
        message: "",
        data: model,
      };
    } else {
      result = {
        isSuccess: false,
        errors: [],
        message: "لا يوجد مشتركين",
        data: {},
      };
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Function To Assign User Into UserSubscription
async function assignIntoUserSubscription(
  userId,
  subscriptionId,
  duration,
  postCredits,
  isFree = false,
  phoneNumber = null
) {
  try {
    const dateNow = new Date();
    // Add 5 days to the current date
    const endDate = new Date(dateNow);
    endDate.setDate(dateNow.getDate() + duration);

    let status = "PENDDING";
    if (isFree) {
      status = "ACCEPTED";
    }

    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input("input_userId", sql.NVarChar, userId)
      .input("input_subscriptionId", sql.Int, subscriptionId)
      .input("input_postCreditsRemaining", sql.Int, postCredits)
      .input("input_status", sql.NVarChar, status)
      .input("input_startDate", sql.DateTime, dateNow)
      .input("input_endDate", sql.DateTime, endDate)
      .input("input_phoneNumber", sql.NVarChar, phoneNumber)
      .query(`Insert INTO UserSubscriptions (userId, SubscriptionId, postCreditsRemaining, status,startDate, endDate, phoneNumber) 
                OUTPUT inserted.* 
                VALUES (@input_userId, @input_subscriptionId, @input_postCreditsRemaining, @input_status, @input_startDate, @input_endDate, @input_phoneNumber)`);

    const result = {
      isSuccess: true,
      errors: [],
      message: "تم أضافة الباقة بنجاح",
      data: user.recordset,
    };

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  assignIntoUserSubscription: assignIntoUserSubscription,
  getSubscriptionById: getSubscriptionById,
  getAllSubscriptions: getAllSubscriptions,
  getAllUserSubscriptions: getAllUserSubscriptions,
  updateUserSubscriptionById: updateUserSubscriptionById,
  getUserSubscriptionById: getUserSubscriptionById,
  changePostCreditsUserSubscriptionById: changePostCreditsUserSubscriptionById
};
