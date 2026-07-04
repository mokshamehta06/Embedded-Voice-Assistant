const User = require ("../Models/user.model.js")

const getAssistantConfig = async(req,res) =>{
    try{
        const {userId} = req.params
        const user = await User.findById(userId).select("geminiApiKey");
        if(!user){
            return res.status(404).json({message : "User not found"})
        }
        return res.status(200).json({message:"Assistant Config data",user})
    }
    catch(err)
    {   
        console.log(err);
        return res.status(500).json({message : "Internal Server Error"})
    }
}
export default getAssistantConfig