const dbUsersOperations = require('../db/dbUsersOperations');


//API TO Add User
module.exports.addUser = async (req, res) => {
    const {id, name, email, picture, roleId } = req.body;
    try {
        await dbUsersOperations.addUser(id, name, email, picture, roleId).then(result =>{
            res.status(201).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};

//API TO GET ByEmail
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

//API TO GET ByToken
module.exports.getByToken = async (req, res) => {
    try {
        const {token} = req.params;
        //Query to get User
        await dbUsersOperations.getUserByToken(token).then(result=>{
            res.status(200).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};