const User = require('../models/user-model');
const ValidationUtil = require('../utility/validation');

const getAllUsers = async (req, res, next) => {

    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
};
