
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
            message: "Add User Successfully!",
            data: {
                name: name,
                email: email,
                token: token,
                picture: picture,
                roleId: roleId
            }
        }
        return result;
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    addUser : addUser
}