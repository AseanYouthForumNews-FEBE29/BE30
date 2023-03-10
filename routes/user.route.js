const express = require('express')
const { check, validationResult } = require('express-validator')
const multer = require('multer')

const userRouter = express.Router()

const { getAllUser, getUserById ,updateUserById,  } = require('../controllers/user.controller')

userRouter.get('/', getAllUser)
userRouter.get('/detail', getUserById)
userRouter.put('/', multer().single("image"), [
    check("email")
        .isEmail()
        .withMessage("Invalid Email Address"),
    
    check("password")
        .isLength({ min: 8 })
        .withMessage("Password Length Minimum 8 Characters"),
    
    check("fullName")
        .isLength({ min: 1 })
        .withMessage("Full Name Must Not Empty")
], (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg)

    const hasError = !error.isEmpty()

    if(hasError){
        res.status(422).json({error: error.array()})
    } else {
        next()
    }
}, updateUserById)

module.exports = userRouter