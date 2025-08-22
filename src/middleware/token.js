/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const { tokenSecretKey } = require('../config');

const generateToken = (obj) => {
    const token = jwt.sign(obj, tokenSecretKey);
    if (token) {
        return token;
    }
    return false;
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(404).json({
            error: true,
            message: 'invalid token...'
        });
    }
    const _token = token.split(" ")[1];
    return jwt.verify(_token, tokenSecretKey, (err, decode) => {
        if (err) {
            return res.status(404).json({
                error: true,
                message: 'invalid user'
            });
        }
        const data = decode;
        res.locals.userId = data.userId;
        return next();
    });
};

module.exports = {
    generateToken,
    verifyToken
};