import { body , check } from "express-validator";

export const singupValidator = [
    body("username")
        .isString()
        .withMessage('username must be a string')
        .isLength({min: 3} , {max: 15})
        .withMessage('username must be at least 3 characters long and at most 15 characters long')
        .custom((value) => value === value.toLowerCase())
        .withMessage('username must be in lowercase'),

    body("email")
        .isEmail()
        .withMessage("Email is invalid"),
    
    body('password')
        .isString()
        .withMessage('password must be a string')
        .isLength({min: 6} , {max: 20})
        .withMessage('password must be at least 6 characters long and at most 20 characters long')     
]


export const loginValidator = [
    body("email")
        .optional()
        .isEmail()
        .withMessage("Email is invalid"),

    body("username")
        .optional()
        .isString()
        .withMessage("username must be a string") 
        .isLength({min : 3}, {max : 15})
        .withMessage("username must be at least 3 characters long and at most 15 characters log")
        .custom((value)=> value === value.toLowerCase())
        .withMessage("username must be in lowercase"),

    body("password")
        .isString()
        .withMessage("password must be a string")
        .isLength({min : 6}, {max : 20})
        .withMessage('password must be at least 6 characters long and at most 20 characters long'),     

    check('email')
        .custom((value, { req }) => {
            if (!value && !req.body.username) {
                throw new Error('Either email or username must be provided');
            }
            return true;
        })      
]