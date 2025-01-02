const User = require('../models/user-model');
const ValidationUtil = require('../utility/validation');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../data/database');

const signup = async (req, res, next) => {

    if (req.body.email == null 
        || req.body.password == null 
        || req.body.lname == null 
        || req.body.fname == null) {
        return res.status(400).send("Improper params supplied");
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
        return res.status(400).send("Unable to validate user details");
    }

    try {
        const existsAlready = await user.existsAlready();

        if (existsAlready) {
            return res.status(400).send("User exists already");
        }

        await user.signup();
    } catch (error) {
        return next(error);
    }

    res.status(200).send({ message: "User created"});
}

const login = async (req, res, next) => {

    const user = new User(req.body.email, req.body.password);
    let existingUser;

    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        return next(error);
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


    const accessToken = jwt.sign(
            { username: user.email, role: 'user'}, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }       
    );

    const refreshToken = jwt.sign(
            { username: user.email, role: 'user'}, 
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '12h' }       
    );


    // await WRITE TO DB SESSIONS

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ accessToken });
}

const logout = async (req, res, next) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;

    try {
        const user = User.findByCookie(refreshToken);
        if (!user) {
            res.clearCookie('jwt', { httpOnly: true });
            return res.sendStatus(204);
        }
    } catch (error) {
        return next(error);
    }

    res.sendStatus(204);
}

const changePassword = async (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Email, current password, and new password are required'
            });
        }

        const user = await db.getDb().collection('users').findOne({ email: email });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const passwordsMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordsMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await db.getDb().collection('users').updateOne(
            { email: email },
            { $set: { password: hashedPassword } }
        );

        const token = jwt.sign(
            { userId: user._id.toString(), email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            message: 'Password updated successfully',
            idToken: token,
            expiresIn: '3600'
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    signup: signup,
    login: login,
    logout: logout,
    changePassword: changePassword
};
