const express = require("express");
const {getAssistantConfig, askAssistant} = require("../Controllers/assistant.controller");

const assistantRouter = express.Router();

assistantRouter.get("/assistant-config/:userId", getAssistantConfig);
assistantRouter.post("/ask-assistant", askAssistant);

module.exports = assistantRouter;