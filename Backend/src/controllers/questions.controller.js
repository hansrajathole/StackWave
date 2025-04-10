import questionModel from "../models/quetions.model.js"
import userModel from "../models/user.model.js"

export const postQuestion = async (req,res)=>{    
    
    const {title , body , tags} = req.body

    try {
        if(!title){
            throw new Error("Title is required")
        }
        if(!body){
            throw new Error("question is required")
        }
    
        const user = req.user
        if(!user){
            res.status(401).json({message : "Unauthorized user"})
        }
        const question = await questionModel.create({
            authorId :user._id,
            title,
            body,
            tags
        })

        await userModel.findByIdAndUpdate(user._id, {
            $push: { questions: question._id }
        })

        res.status(201).json({ message : "created successfully", question})
        
    }
    catch (error) {
        console.log("Error in questionPost controller : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });  
    }
    
    
}

export const getAllQuestions = async (req,res)=>{
    try {
        
        const questions = await questionModel.find({}).populate("authorId", "username")

        res.status(200).json({message : "All questions", questions})

    } catch (error) {
        console.log("Error in getAllQuestions controller : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
        
    }
}