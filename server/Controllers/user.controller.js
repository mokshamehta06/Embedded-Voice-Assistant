const User = require("../Models/user.model");

const getCurrent = async (req,res) => {
    try{
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(404).json({message:"Failed to get current user"})
        }
        return res.status(200).json(user)
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}
const getAssistantConfig = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select(
            'assistantName businessName businessType businessDescription tone theme enableVoice enableNavigation pages'
        );
        if (!user || !user.assistantName) {
            return res.status(404).json({ message: "Assistant not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
const saveAssistant = async (req, res) => {
    try {
        const {
            assistantName,
            businessName,
            businessType,
            businessDescription,
            tone,
            theme,
            enableVoice,
            enableNavigation,
            geminiApiKey,
            pages,
        } = req.body;
        const user = await User.findById(req.userId)
        
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
         user.assistantName = assistantName;
         user.businessName = businessName;
         user.businessType = businessType;
         user.businessDescription = businessDescription;
         user.tone = tone;
         user.theme = theme;
         user.enableVoice = enableVoice;
         user.enableNavigation = enableNavigation;
         if(geminiApiKey){
            user.geminiApiKey=geminiApiKey
         }
         user.geminiStatus="active";
         user.pages = pages || [];
         user.isSetupComplete=true
         await user.save();
         return res.status(200).json({message:"Assistant saved successfully", user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}
module.exports = {getCurrent, saveAssistant, getAssistantConfig};