const User = require ('../models/User')
const Blacklist = require('../models/Blacklist')
const bcrypt = require('bcrypt')
const {createAccessToken} = require('../middlewares/authMiddleware')

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
            message: "User sucessfully registered"
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
        const {password: _password, ...safeUser} = user.toObject()
        return res.status(200).json({
            message: "Login successfully",
            user: safeUser,
            token: accessToken
            
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
            message: "User has been logout successfully"
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {registerUser, loginUser, logoutUser}