const dbUsersOperations = require('../db/dbUsersOperations');


//API TO Add User
module.exports.addUser = async (req, res) => {
    const { name, email, token, picture, roleId } = req.body;
    try {
        await dbUsersOperations.addUser(name, email, token, picture, roleId).then(result =>{
            res.status(201).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};

//API TO GET UserByEmail
module.exports.getByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        //Query to get User
        await dbUsersOperations.getUserByEmail(email).then(result=>{
            res.status(200).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};