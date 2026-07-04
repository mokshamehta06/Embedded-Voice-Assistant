const express = require("express");
const isAuth = require("../Middleware/isAuth");
const { getCurrent, saveAssistant, getAssistantConfig } = require("../Controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/current-user", isAuth, getCurrent);
userRouter.post("/save-assistant", isAuth, saveAssistant);
userRouter.get("/assistant-config/:userId", getAssistantConfig);

module.exports = userRouter;