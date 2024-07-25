const User = require('../models/user-model');

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

    if (req.body == null) {
        console.log("No request body provided!");
        return;
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
        ) || !ValidationUtil.emailIsConfirmed(req.body.email, req.body['confirm-email'])
    ) {
        console.log("Invalid user details!");
        return;
    }

    try {
        const existsAlready = await user.existsAlready();

        if (existsAlready) {
            console.log("User exists already!");
            return;
        }

        await user.signup();
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById 
};
