const User = require('../models/user-model');
const ValidationUtil = require('../utility/validation');
const bcrypt = require('bcrypt');
const mongodb = require('mongodb');

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

    let userID;
    try {
        userID = await user.signup();
    } catch (error) {
        return next(error);
    }

    return res.status(201).json({ message: "User created", id: userID});
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
    try {
        console.log('Getting user with ID:', req.params.id);
        const user = await User.findById(req.params.id);
        if (!user) {
            console.log('No user found');
            return res.status(404).json({
                success: false,
                message: "No user with ID exists"
            });
        }
        console.log('Found user:', user);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUserById:', error);
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const result = await User.deleteByUserId(req.params.id);
        if (!result.deletedCount) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(204).json({
                success: true,
                message: "No changes requested"
            });
        }

        if (req.body.email) {
            if (!ValidationUtil.isValidEmail(req.body.email)) {
                return res.status(400).json({
                    success: false,
                    message: "A valid email address must be provided"
                });
            }
            const existingUser = await User.findByEmail(req.body.email);
            if (existingUser && existingUser._id.toString() !== req.params.id) {
                return res.status(400).json({
                    success: false,
                    message: "This email address is already in use"
                });
            }
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user with ID was found"
            });
        }

        const updatedUser = await User.patch(req.body, req.params.id);
        return res.status(200).json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser
};
