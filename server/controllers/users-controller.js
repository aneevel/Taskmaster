const User = require('../models/user-model');
const ValidationUtil = require('../utility/validation');

const createUser = async (req, res, next) => {

    if (req.body == null ||
        req.body.email == null) {
        return res.status(400).json({ message: "Invalid params supplied" });
    }

    if (req.body.email.trim() == "" ||
        !ValidationUtil.isValidEmailAddress(req.body.email)) 
    {
        return res.status(400).json({ message: "A valid, non-existing email must be provided" });
    }
    return res.status(200).send();
}

const getAllUsers = async (req, res, next) => {

    let users;
    try {
        users = await User.findAll();
    } catch (error) {
        return next(error);
    }

    return res.status(200).send(users);
}

const getUserById = async (req, res, next) => {

    let user;
    try {
        user = await User.findById(req.params.id);
    } catch (error) {
        return next(error);
    }

    if (user == null) {
        return res.status(404).json({ message: "No user with ID exists" });
    }

    return res.status(200).send(user);
}

module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createUser: createUser,
};
