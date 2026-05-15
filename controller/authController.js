    const User = require ('../models/User')
    const Blacklist = require('../models/Blacklist')
    const bcrypt = require('bcrypt')
    const {createAccessToken, createRefreshToken} = require('../middlewares/authMiddleware')
    const RefreshToken = require('../models/RefreshToken')
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
    const jwt = require('jsonwebtoken')

    const registerUser = async(req, res, next) => {
        try {
            
            const {firstName, lastName, email, password} = req.body
            // validate fields
            if (!firstName || !lastName || !email || !password) {
                return res.status(400).json({
                    message: "All fields are required"
                })
            }
            // check if valid email
            if (!email.includes('@')) {
                return res.status(400).json({
                    message: "Invalid email format"
                })
            }
            // check password format
            if (password.length < 8) {
                return res.status(400).json({
                    message: "Password must contain atleast 8 characters"
                })
            }
            // check if existing user
            const existingUser = await User.findOne({email})
            if (existingUser) {
                return res.status(409).json({
                    message: "User already exist"
                })
            }
            // hashed password
            const hashedPassword = await bcrypt.hash(password, 10)
            // create and save user
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })
            await newUser.save()
            const {password: _password, ...safeUser} = newUser.toObject()
            console.log(safeUser)
            return res.status(201).json({
                message: "User successfully registered"
            })

        } catch (err) {
            next(err)
        }
    }

    const loginUser = async (req, res, next) => {
        try {
            const {email, password} = req.body
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and Password are required"
                })
            }
            if (!email.includes('@')) {
                return res.status(400).json({
                    message: "Invalid email format"
                })
            }
            const user = await User.findOne({email})
            if (!user) {
                return res.status(401).json({
                    message: "Invalid email or password"
                })
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            if (!isPasswordCorrect) {
                return res.status(401).json({
                    message: "Invalid email or password"
                })
            }
            const accessToken = createAccessToken(user);
            const refreshToken = createRefreshToken(user);
            await RefreshToken.create({userId: user._id, token: refreshToken})
            const {password: _password, ...safeUser} = user.toObject()
            return res.status(200).json({
                message: "Login successfully",
                user: safeUser, 
                token: accessToken, 
                refresh: refreshToken
            })
        } catch (err) {
            next(err)
        } 
    }

    const logoutUser = async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            await Blacklist.create({token})
            return res.status(200).json({
                message: "User has been logged out"
            })
        } catch (err) {
            next(err)
        }
    }

    const refreshUserToken = async (req, res, next) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) {
                return res.status(401).json({
                    message: "No refresh token provided"
                })
            }
            const verifyRefreshToken = await RefreshToken.findOne({token: refreshToken})
            if (!verifyRefreshToken) {
                return res.status(401).json({
                    message: "Invalid refresh token"
                })
            }
            const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET)
            // get user
            const user = await User.findById(decoded.id)
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }
            const newAccessToken = createAccessToken(user)
            return res.status(200).json({
                token: newAccessToken
            })
        } catch (err) {
            next(err)
        }
    }

    module.exports = {registerUser, loginUser, logoutUser, refreshUserToken}