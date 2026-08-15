const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

async function run() {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db;
    const users = await db.collection('users').find({}).toArray();
    
    if (users.length === 0) {
        console.log("No users found");
        process.exit(0);
    }
    
    const user = users[0];
    console.log("Found User ID:", user._id);
    console.log("User Gemini Status:", user.geminiStatus);
    console.log("User API Key:", user.geminiApiKey ? "Exists" : "Missing");

    const res = await fetch("http://localhost:5000/api/assistant/ask-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message: "Hello",
            userId: user._id.toString()
        })
    });
    
    console.log("Response Status:", res.status);
    const data = await res.text();
    console.log("Response Body:", data);
    
    process.exit(0);
}

run().catch(console.error);
