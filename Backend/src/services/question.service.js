import questionModel from "../models/quetions.model.js"

export const questionPost = async function(title , body , tags) {
    if(!title){
        throw new Error("Title is required")
    }
    if(!body){
        throw new Error("question is required")
    }

    
    const question = await questionModel.create({
        title,
        body,
        tags
    })
    return question
}