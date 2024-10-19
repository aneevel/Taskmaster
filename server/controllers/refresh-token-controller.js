const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const refresh = async (req, res, next) => {

    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    console.log(cookies.jwt);

    const refreshToken = cookies.jwt;

    try {
        const user = User.findByCookie(refreshToken);
        //if (!user) return res.sendStatus(403);
    } catch (error) {
        return next(error);
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log(decoded);
            //if (err || user.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '2h' }
            );
            res.json({ accessToken });
        }
    );
}


module.exports = {
    refresh: refresh
};
