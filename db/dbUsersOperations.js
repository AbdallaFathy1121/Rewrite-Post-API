
const config = require('./dbconfig');
const sql = require('mssql');

async function addUser(name, email, token, picture, roleId){
    try{
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('input_name',sql.NVarChar,name)
        .input('input_email',sql.NVarChar,email)
        .input('input_token',sql.NVarChar,token)
        .input('input_picture',sql.NVarChar,picture)
        .input('input_roleId',sql.Int,roleId)
        .query("Insert INTO Users (name, email, token, picture, roleId) VALUES (@input_name, @input_email, @input_token, @input_picture, @input_roleId)");

        const result = {
            isSuccess: true,
            errors: [],
            message: "تم التسجيل بنجاح",
            data: {
                name: name,
                email: email,
                token: token,
                picture: picture,
                roleId: roleId
            }
        };

        return result;
    }
    catch(error){
        throw error;
    }
}

async function getUserByEmail(email){
    try{
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input("input_email", sql.NVarChar, email)
        .query('Select u.name, u.email, u.roleId, u.picture from users u where u.email = @input_email');

        // Response
        const model = user.recordsets[0][0];
        let result;
        if (model != null) {
            result = {
                isSuccess: true,
                errors: [],
                message: "يوجد مستخد بهذ البريد الالكترونى",
                data: {
                    name: model.name,
                    email: model.email,
                    picture: model.picture,
                    roleId: model.roleId
                }
            };
        }
        else {
            result = {
                isSuccess: false,
                errors: [],
                message: "لا يوجد مستخد بهذا البريد الالكترونى",
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

async function getUserByToken(token){
    try{
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input("input_token", sql.NVarChar, token)
        .query('Select u.name, u.email, u.roleId, u.picture from users u where u.token = @input_token');

        // Response
        const model = user.recordsets[0][0];
        let result;
        if (model != null) {
            result = {
                isSuccess: true,
                errors: [],
                message: "",
                data: {
                    name: model.name,
                    email: model.email,
                    picture: model.picture,
                    roleId: model.roleId
                }
            };
        }
        else {
            result = {
                isSuccess: false,
                errors: [],
                message: "لا يوجد مستخد",
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

module.exports = {
    addUser : addUser,
    getUserByEmail: getUserByEmail,
    getUserByToken: getUserByToken
}