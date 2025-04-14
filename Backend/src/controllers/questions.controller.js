import answerModel from "../models/answers.model.js"
import questionModel from "../models/quetions.model.js"
import userModel from "../models/user.model.js"

export const postQuestion = async (req,res)=>{    
    
    const {title , body , tags} = req.body
    const userId = req.user._id
    console.log(title , body ,tags);
    
    try {
        if(!title){
            throw new Error("Title is required")
        }
        if(!body){
            throw new Error("question is required")
        }
    
        
        if(!user){
            res.status(401).json({message : "Unauthorized user"})
        }
        const question = await questionModel.create({
            authorId : userId,
            title,
            body,
            tags
        })

        await userModel.findByIdAndUpdate(userId , {
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
        
        const questions = await questionModel.find()
        .populate({
            path: "authorId",
            select: "username avatar questions",
            populate: {
              path: "questions",
              select: "title createdAt",
            }
          })
          .sort({ createdAt: -1 });
        console.log(" fetching data ",questions);
        
        res.status(200).json({message : "All questions", questions})

    } catch (error) {
        console.log("Error in getAllQuestions controller : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
        
    }
}

export const getAllUserQuestions = async (req,res)=>{
    try {
        const userId = req.params.id
        if(!userId){
            throw new Error("User id is required")
        }
        const questions = await questionModel.find({authorId : userId}).populate("authorId",)
        console.log(questions);
        
        res.status(200).json({message : "All questions", questions})
    } catch (error) {
        console.log("Error in getAllUserQuestions controller : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
        
    }
}

export const getQuestionById = async (req, res) => {
    try {
        const questionId = req.params.id;
        if (!questionId) {
            throw new Error("Question id is required");
        }

        const question = await questionModel.findById(questionId)
            .populate({
                path: "authorId",
                select: "username avatar"
            })
            .populate({
                path: "answers",
                populate: {
                    path: "authorId",
                    select: "username avatar"
                }
            });

        console.log(question);

        res.status(200).json({ message: "Question details", question });
    } catch (error) {
        console.log("Error in getQuestionById controller: ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
};
export const updateQuestion = async (req,res)=>{
    try {
        const questionId = req.params.id
        const userId = req.user._id
        if(!questionId){
            throw new Error("Question id is required")
        }
        const {title , body , tags} = req.body
        let question = await questionModel.findById(questionId)

        if(question.authorId.toString() !== userId.toString()){
            throw new Error("you are not authorized to upadate this question")
        }

        question = await questionModel.findByIdAndUpdate(questionId, {
            title,
            body,
            tags
        }, {new : true})

        res.status(200).json({message : "Updated successfully", question})
    } catch (error) {
        console.log("Error in getAllUserQuestions controller : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
        
    }
}
export const deleteQuestion = async (req,res)=>{
    try {
        const questionId = req.params.id
        const userId = req.user._id

        if(!questionId){
            throw new Error("Question id is required")
        }

        const question = await questionModel.findById(questionId)

        if(question.authorId.toString() !== userId.toString()){
            throw new Error("you are not authorized to delete this question")
        }

        await questionModel.findByIdAndDelete(questionId)
        await answerModel.deleteMany({
            questionId : questionId
        })
        res.status(200).json({message : "Deleted successfully"})
    } catch (error) {
        console.log("Error in getAllUserQuestions controller : ", error.message);
        res.status(500).json({ message: error.message || "Internal Server Error" });
        
    }
}