const User = require('../models/user-model');
const ValidationUtil = require('../utility/validation');

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
};
