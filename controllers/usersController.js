const dbUsersOperations = require('../db/dbUsersOperations.ts');


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