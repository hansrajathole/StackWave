import { validationResult } from "express-validator"
import * as userService from "../services/user.service.js"
import userModel from "../models/user.model.js"
import questionModel from '../models/quetions.model.js'
import redis from "../services/redis.service.js"
export const singupController = async (req,res)=>{
    
    const {username, email, password} = req.body

    try {

        const errors = validationResult(req)
    
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array()[0].msg})
        }
        

        const user = await userService.createUser({
            username,
            email,
            password
        })
 
        delete user._doc.password

        const token = await user.generateToken()
        console.log(token);
        
        res.json({message: "User registered successfully", token: token, user})

    } catch (error) {
        console.log("Error in singupController : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

export const loginController = async (req , res) => {
    const {username , email , password} = req.body
    try {
        console.log(req.body);
        
        const errors = validationResult(req)
    
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array()[0].msg})
        }
        
        
        const user = await userService.loginUser({
            username,
            email,
            password
        })

        delete user._doc.password
        
        const token = await user.generateToken()
        
        console.log("user logged in successfully");
        res.json({message: "User logged in successfully", token: token , user})


    } catch (error) {
        console.log("Error in loginController : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });   
    }
}

export const meController =  async (req, res)=>{
    try {
        const user = await userModel.findById(req.user._id)

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message : "User found successfully", user});

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}

export const logoutController = async (req, res) => {
    
    const timeRemainingForToken = req.tokenData.exp * 1000 - Date.now()
    
    await redis.set(`blacklist: ${req.tokenData.token}`, true , "EX" ,Math.floor(timeRemainingForToken/1000))

    res.status(200).json({message: "User logged out successfully"})
}
