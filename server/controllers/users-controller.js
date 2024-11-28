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

const updateUser = async (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
        return res.status(204).send();
    }

    if (!ValidationUtil.isEmpty(req.body.email)) {
        if (ValidationUtil.isValidEmailAddress(req.body.email)) {
            let user = new User(req.body.email);
            let compareUser = await user.getUserWithSameEmail();
            let givenUser = await User.findById(req.params.id);
            if (JSON.stringify(compareUser) != JSON.stringify(givenUser)) {
                console.log(`Error: That email already exists`);
                return res.status(400).json({message: "This email address is already in use" });
            }
        } else {
            return res.status(400).json({message: "A valid email address must be provided" });
        }
    }

    if (!ValidationUtil.isEmpty(req.body.password) && !ValidationUtil.isValidPassword(req.body.password)) {
        return res.status(400).json({message: "A password greater than 8 characters and less than 50 characters must be provided" });
    }

    if (!ValidationUtil.isEmpty(req.body.lname) && !ValidationUtil.isValidName(req.body.lname)) {
        return res.status(400).json({message: "A last name must not exceed 50 characters" });
    }

    if (!ValidationUtil.isEmpty(req.body.fname) && !ValidationUtil.isValidName(req.body.fname)) {
        return res.status(400).json({message: "A first name must not exceed 50 characters" });
    }

    let user;
    try {
        user = await User.findById(req.params.id);
    } catch (error) {
        return next(error);
    }

    if (!user) {
        return res.status(404).json({ message: "No user with ID was found" }); }

    let createdUser = new User(
        user.email,
        user.password,
        user.lname,
        user.fname
    );
    
    if (!ValidationUtil.isEmpty(req.body.password)) 
        req.body.password = await bcrypt.hash(req.body.password, 12);

    createdUser = await createdUser.patch(req.body, req.params.id);

    return res.status(200).send({ user: createdUser });
}

module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser
};
