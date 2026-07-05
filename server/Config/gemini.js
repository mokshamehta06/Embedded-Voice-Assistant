const Gemini_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key="

const generateGeminiResponse = async ({
    prompt,
    apiKey,
    user
}) => {
    try{
        if(!apiKey){
            throw new Error("Gemini API key Missing")
        }
        const response = await fetch(`${Gemini_URL}${apiKey}`,{
            method:"POST",
            headers :{
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                contents:[
                    {
                        parts : [
                            {text : prompt}
                        ]
                    }
                ]
            })
        })
       if(!response.ok){
        if(
            response.status === 400 || 
            response.status === 401
        ){
            user.geminiStatus = 
            "invalid";
            await user.save();
        }
        if(
            response.status === 429
        ){
            user.geminiStatus = "Quota Exceeded";
            await user.save();
        }
        const err = 
        await response.text();
        throw new Error(err);
       } 
       user.geminiStatus =
       "active";
       await user.save();
       const data =await response.json();
       const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
       if(!text){
        throw new Error("No valid response from Gemini")
       }
       return text.trim();
       
    } catch(error){
        console.log("Gemini API Error: ",error);
        throw error;
    }
}

module.exports = { generateGeminiResponse, Gemini_URL };