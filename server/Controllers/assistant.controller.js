const User = require("../Models/user.model.js");
const { generateGeminiResponse } = require("../Config/gemini.js");

const getAssistantConfig = async (req, res) => {
    try {
        const { userId } = req.params;

        // Select the fields the widget needs to build itself. 
        // We do NOT send geminiApiKey to the public frontend for security!
        const user = await User.findById(userId).select(
            "assistantName businessName businessType businessDescription tone theme enableVoice enableNavigation pages"
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Assistant Config data",
            user,
        });

    } catch (err) {
        console.log("getAssistantConfig error:", err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        return res.status(500).json({ message: err.message || "Internal Server Error" });
    }
};

const askAssistant = async (req, res) => {
    try {
        const { message, userId } = req.body;

        if (!message || !userId) {
            return res.status(400).json({
                message: "Message and userId are required",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (!user.geminiApiKey) {
            return res.status(403).json({
                message: "Please provide Gemini API Key",
            });
        }

        if (user.plan === "free" && user.totalMessages >= user.requestLimit) {
            return res.status(403).json({
                message: "Free limit exceeded. Please upgrade to a paid plan.",
            });
        }

        if (
            user.plan === "pro" &&
            new Date(user.proExpiresAt) < new Date()
        ) {
            user.plan = "free";
            await user.save();

            return res.status(400).json({
                message: "Pro subscription expired. Please upgrade.",
            });
        }

        const cleanMessage = message.toLowerCase().trim();

        if (user.enableNavigation) {
            const navigationWords = [
                "open",
                "go",
                "show",
                "navigate",
                "take me",
            ];

            const wantsNavigation = navigationWords.some((word) =>
                cleanMessage.startsWith(word)
            );

            if (wantsNavigation) {
                const matchedPage = user.pages.find((page) =>
                    page.keywords.some((keyword) =>
                        cleanMessage.includes(keyword.toLowerCase())
                    )
                );

                if (matchedPage) {
                    if (req.body.currentPath === matchedPage.path) {
                        return res.status(400).json({
                            message: "You are already on that page",
                        });
                    }

                    return res.json({
                        success: true,
                        action: "navigate",
                        page: matchedPage.path,
                        response: `Opening ${matchedPage.name}`,
                    });
                }
            }
        }

        const prompt = `
You are ${user.assistantName}

Business Name:
${user.businessName}

Business Type:
${user.businessType}

Business Description:
${user.businessDescription}

Assistant Tone:
${user.tone}

Rules:
- Keep replies under 15 words
- Give fast direct responses
- Talk naturally
- Behave like smart voice assistant
- Avoid long explanations
- Keep response short for quick voice playback

User Question:
${message}
`;
        const aiResponse = await generateGeminiResponse({
            prompt,
            apiKey: user.geminiApiKey,
            user,
        });

        if (user.plan === "free") {
            user.totalMessages += 1;
            await user.save();
        }

        return res.json({
            success: true,
            action: "response",
            response: aiResponse,
        });

    } catch (error) {
        console.log("askAssistant error:", error);
        return res.status(500).json({
            message: error.message || "Internal Server Error",
        });
    }
};

module.exports = {
    getAssistantConfig,
    askAssistant,
};