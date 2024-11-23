const User = require('../models/user-model');
const ValidationUtil = require('../utility/validation');

const createUser = async (req, res, next) => {

    if (req.body === null || req.body === undefined || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Invalid params supplied" });
    }

    if (ValidationUtil.isEmpty(req.body.email) ||
        !ValidationUtil.isValidEmailAddress(req.body.email))
    {
        return res.status(400).json({ message: "A valid, non-existing email must be provided" });
    }

    if (!ValidationUtil.isValidPassword(req.body.password))
    {
        return res.status(400).json({ message: "A password of at least 8 characters must be provided" });
    }

    if (!ValidationUtil.isValidName(req.body.lname))
    {
        return res.status(400).json({ message: "A non-empty last name of less than 50 characters must be provided" });
    }

    if (!ValidationUtil.isValidName(req.body.fname))
    {
        return res.status(400).json({ message: "A non-empty first name of less than 50 characters must be provided" });
    }

    let user = new User(req.body.email, req.body.password, req.body.lname, req.body.fname);
    if (await user.existsAlready()) {
        return res.status(400).json({ message: "User with email already exists" });
    }

    await user.signup();

    return res.status(201).json({ "message": "User created", id: user});
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

const deleteUser = async (req, res, next) => {

    try {
        await User.deleteByUserId(req.params.id);
    } catch (error) {
        return next(error);
    }

    return res.status(204).send();
}

module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createUser: createUser,
    deleteUser: deleteUser
};
