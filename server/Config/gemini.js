const Gemini_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key="

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
        if(response.status === 429){
            user.geminiStatus = "quota_exceeded";
            await user.save();
        }
        const err = await response.text();
        
        if (response.status === 429 || response.status === 403) {
             console.log("Gemini API Quota Exceeded. Returning Mock Response.");
             return `Hello! As an interview demo, I am currently running in offline mode because the AI quota is exhausted. However, my voice navigation still works! Try saying "open pricing page".`;
        }

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