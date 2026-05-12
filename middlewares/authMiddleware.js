const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
const Blacklist = require('../models/Blacklist')

// Token Creation
// jwt.sign(payload, secret, options)
const createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(data, JWT_SECRET_KEY,{expiresIn: "24h"});
};


const createRefreshToken = (user) => {
    const data = {id: user._id}
    return jwt.sign(data, JWT_REFRESH_SECRET,{expiresIn: '7d'})
}

const verify = async(req, res, next) => {
    try {
        // get authorization header
        const authHeader = req.headers.authorization
        // check token format and existence
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'No access token'
            })
        }
        const token = authHeader.split(' ')[1];
        // check blacklist
        const blacklisted = await Blacklist.findOne({token})
        if (blacklisted) {
            return res.status(401).json({
                message: "User has been logout"
            })
        }
        // verify token
        // syntax = jwt.verify(token, secretOrPublicKey, callback)
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded
        if (process.env.NODE_ENV === 'development') console.log('Decoded:', decoded)
        next();
    } catch (err) {
        next (err)
    }
}

const verifyAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                auth: "Failed",
                message: "Access denied, Admins only"
            })
        }
    next()
    } catch (err) {
        next(err)
    }
}




module.exports = {createAccessToken, verify, verifyAdmin, createRefreshToken}
