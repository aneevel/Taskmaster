const User = require('../models/user-model');
const ValidationUtil = require('../utility/validation');

const signup = async (req, res, next) => {

    if (req.body.email == null 
        || req.body.confirmEmail == null
        || req.body.password == null 
        || req.body.lname == null 
        || req.body.fname == null) {
        return res.status(400).send("Improper params supplied!");
    }

    const user = new User(
        req.body.email,
        req.body.password,
        req.body.lname,
        req.body.fname
    );

    if (
        !ValidationUtil.userDetailsAreValid(
            req.body.email,
            req.body.password,
            req.body.lname,
            req.body.fname
        ) 
    ) {
        return res.status(400).send("Unable to validate user details!");
    }

    if ( 
        !ValidationUtil.emailIsConfirmed(req.body.email, req.body.confirmEmail))
        {
            return res.status(400).send("Email and confirm email do not match!");
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

const login = async (req, res, next) => {
    const user = new User(req.body.email, req.body.password);
    let existingUser;

    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        return res.status(400).send("Unable to find user with same email!");
    }

    const sessionErrorData = {
        errorMessage: 'Invalid credentials - please double-check your credentials and try again.',
        email: user.email,
        password: user.password
    }

    if (!existingUser) {
        return res.status(400).send({ code: "ENU", errordata: sessionErrorData });
    }

    const passwordIsCorrect = await user.hasMatchingPassword(
        existingUser.password
    );

    if (!passwordIsCorrect) {
        return res.status(400).send({ code: "EIP", errordata: sessionErrorData });
    }
    
    return res.status(200).send(existingUser );
}

const logout = async (req, res, next) => {
    res.redirect("/login");
}

module.exports = {
    signup: signup,
    login: login,
    logout: logout
};
