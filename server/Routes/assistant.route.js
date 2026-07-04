const express = require("express");
const {getAssistantConfig} = require("../Controllers/assistant.controller");

const assistantRouter = express.Router();

assistantRouter.get("/assistant-config/:userId", getAssistantConfig);

module.exports = assistantRouter;