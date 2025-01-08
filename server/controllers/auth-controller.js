const User = require('../models/user-model');
const ValidationUtil = require('../utility/validation');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const signup = async (req, res, next) => {
    if (req.body.email == null 
        || req.body.password == null 
        || req.body.lname == null 
        || req.body.fname == null) {
        return res.status(400).json({
            success: false,
            message: "Improper params supplied"
        });
    }

    // Validate email format
    if (!req.body.email || !ValidationUtil.isValidEmail(req.body.email)) {
        return res.status(400).json({
            success: false,
            message: "A valid, non-existing email must be provided"
        });
    }

    // Validate password length
    if (!req.body.password || req.body.password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "A password of at least 8 characters must be provided"
        });
    }

    // Validate name lengths
    if (!req.body.fname || req.body.fname.length > 50) {
        return res.status(400).json({
            success: false,
            message: "A non-empty first name of less than 50 characters must be provided"
        });
    }

    if (!req.body.lname || req.body.lname.length > 50) {
        return res.status(400).json({
            success: false,
            message: "A non-empty last name of less than 50 characters must be provided"
        });
    }

    if (!ValidationUtil.isValidName(req.body.fname)) {
        return res.status(400).json({
            success: false,
            message: "First name contains inappropriate content or is invalid"
        });
    }

    if (!ValidationUtil.isValidName(req.body.lname)) {
        return res.status(400).json({
            success: false,
            message: "Last name contains inappropriate content or is invalid"
        });
    }

    const user = new User(
        req.body.email,
        req.body.password,
        req.body.lname,
        req.body.fname
    );

    try {
        const existsAlready = await user.existsAlready();
        console.log('Checking existence:', req.body.email, existsAlready);

        if (existsAlready) {
            return res.status(400).json({
                success: false,
                message: `User with email ${req.body.email} already exists`
            });
        }

        console.log('Creating new user...');
        const result = await user.signup();
        console.log('User creation result:', result);  
        
        res.status(200).json({ 
            success: true,
            message: "User created",
            id: result.insertedId  
        });
    } catch (error) {
        console.error('Error in signup:', error);
        next(error);
    }
};

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

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json(
        { 
            "accessToken": accessToken,
            "userId": existingUser._id
        });
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

    if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            message: 'Email, current password, and new password are required'
        });
    }

    try {
        const user = new User(email, oldPassword);
        const existingUser = await user.getUserWithSameEmail();

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const passwordIsCorrect = await user.hasMatchingPassword(
            existingUser.password
        );

        if (!passwordIsCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        await User.updatePassword(email, newPassword);

        const accessToken = jwt.sign(
            { username: email, role: 'user' },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );

        const refreshToken = jwt.sign(
            { username: email, role: 'user' },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '12h' }
        );

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ 
            success: true,
            message: 'Password updated successfully',
            accessToken 
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
