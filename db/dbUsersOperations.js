const config = require("./dbconfig");
const sql = require("mssql");
const jwt = require("jsonwebtoken");

async function addUser(id, name, email, picture, roleId) {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input("input_id", sql.NVarChar, id)
      .input("input_name", sql.NVarChar, name)
      .input("input_email", sql.NVarChar, email)
      .input("input_picture", sql.NVarChar, picture)
      .input("input_roleId", sql.Int, roleId)
      .query(
        "Insert INTO Users (id, name, email, picture, roleId) VALUES (@input_id, @input_name, @input_email, @input_picture, @input_roleId)"
      );

    const result = {
      isSuccess: true,
      errors: [],
      message: "تم التسجيل بنجاح",
      data: {
        id: id,
        name: name,
        email: email,
        picture: picture,
        roleId: roleId,
      },
    };

    return result;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input("input_email", sql.NVarChar, email)
      .query(
        "Select u.id, u.name, u.email, u.roleId, u.picture, r.RoleName as roleName, u.UserSubscriptionsId as userSubscriptionId from users u left join Roles r on r.Id = u.RoleId where u.email = @input_email"
      );

    // Response
    const model = user.recordsets[0][0];
    let result;
    if (model != null) {
      result = {
        isSuccess: true,
        errors: [],
        message: "يوجد مستخد بهذ البريد الالكترونى",
        data: {
          id: model.id,
          name: model.name,
          email: model.email,
          picture: model.picture,
          roleId: model.roleId,
          roleName: model.roleName,
          userSubscriptionId: model.userSubscriptionId,
        },
      };
    } else {
      result = {
        isSuccess: false,
        errors: [],
        message: "لا يوجد مستخد بهذا البريد الالكترونى",
        data: {},
      };
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getAllUsers() {
  try {
    let pool = await sql.connect(config);
    let user = await pool.request()
      .query(`SELECT u.Id, u.Name, u.email, u.Picture, u.RoleId, r.RoleName, u.UserSubscriptionsId, COUNT(p.UserId) as PostNumbers
            FROM users u
            left join Posts p
            on p.UserId = u.Id
            left join Roles r
            on r.Id = u.RoleId
            GROUP BY u.Id, u.Name, u.email, u.Picture, u.RoleId, r.RoleName, u.UserSubscriptionsId
        `);

    // Response
    const model = user.recordsets[0];
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
        message: "لا يوجد يوجد مستخدمين",
        data: {},
      };
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function UpdateUserSubscriptionIdByUserId(userId, userSubscriptionId) {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .query(
        `UPDATE users SET userSubscriptionsId = ${userSubscriptionId} WHERE id = ${userId}`
      );

    const result = {
      isSuccess: true,
      errors: [],
      message: "تم التعديل بنجاح",
      data: {},
    };

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addUser: addUser,
  getUserByEmail: getUserByEmail,
  UpdateUserSubscriptionIdByUserId: UpdateUserSubscriptionIdByUserId,
  getAllUsers: getAllUsers,
};
