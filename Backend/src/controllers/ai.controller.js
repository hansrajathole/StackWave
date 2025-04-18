import generateContent from "../services/generatecode.ai.service.js";

export const fixCodeController = async (req , res)=>{
    try {
        
        const {code} = req.body
        if(!code){
            throw new Error("your are not write any code ")
        }

        const response =  await generateContent(code)
        console.log(response);
        res.status(200).json({ message : "your code fix successfully" , fixCode : response})
        
    } catch (error) {
        console.log("error in fixCodeController : ", error.message)
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}