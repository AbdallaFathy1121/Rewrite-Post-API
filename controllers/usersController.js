const dbUsersOperations = require('../db/dbUsersOperations');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const calculateExpirationDate = require('../helpers/calculateExpirationDate');


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

//API TO Add User
module.exports.UpdateUserSubscriptionIdById = async (req, res) => {
    const { id, userSubscriptionId } = req.body;
    try {
        await dbUsersOperations.UpdateUserSubscriptionIdByUserId(id, userSubscriptionId).then(result =>{
            res.status(200).json(result);
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

//API TO GET All Users
module.exports.getAll = async (req, res) => {
    try {
        //Query to get Users
        await dbUsersOperations.getAllUsers().then(result=>{
            res.status(200).json(result);
        })
    } catch (err) {
        res.status(404).send(err.message);
    }
};



//API TO GET All Users
module.exports.login = async (req, res) => {
    const {email} = req.body;
    try {
        // Get User By Email
        let user;
        await dbUsersOperations.getUserByEmail(email).then(result => {
            user = result.data;
        })

        if (!user) {
            return res.status(400).json({ message: 'Invalid Email' });
        }

        const payload = { id: user.id, email: user.email, name: user.name, picture: user.picture, roleId: user.roleId, roleName: user.roleName };
        const expiresIn = '7d';
            
        // Create a JWT token
        const token = jwt.sign(
            payload, 
            process.env.SECRET_KEY, 
            { expiresIn }
        );

        // Calculate the expiration date
        const expirationDate = calculateExpirationDate.calculateExpirationDate(expiresIn);

        return res.status(201).json( {
            token: token,
            expiresAt: expirationDate
        });

    } catch (err) {
        res.status(404).send(err.message);
    }
};

