import userModel from "../models/user.model.js";


export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await userModel.findById(userId).populate("questions").populate("answers")
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}


export const updateProfile = async (req, res) => {

    
}


export const getAllUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        
        const users = await userModel.find({
            _id: { $ne: userId }
        }).sort({ reputation: -1 })
        


        if (!users) {
            return res.status(404).json({ message: "No users found" });
        }


        users.sort((a, b) => b.reputation - a.reputation);
      
        
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
