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

const signup = async (req, res, next) => {

    if (req.body.email == null 
        || req.body.confirmEmail == null
        || req.body.password == null 
        || req.body.lname == null 
        || req.body.fname == null) {
        return res.status(400).send("Improper params supplied!");
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        lname: req.body.lname,
        fname: req.body.fname
    });

    if (
        !ValidationUtil.userDetailsAreValid(
            req.body.email,
            req.body.password
        ) || !ValidationUtil.emailIsConfirmed(req.body.email, req.body.confirmEmail)
    ) {
        return res.status(400).send("Unable to validate user details!");
    }

    try {
        const existsAlready = await user.existsAlready();

        if (existsAlready) {
            return res.status(400).send("User exists already!");
        }

        await user.signup();
    } catch (error) {
        return next(error);
    }

    return res.status(200).send("User created!");
}


module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    signup: signup
};
