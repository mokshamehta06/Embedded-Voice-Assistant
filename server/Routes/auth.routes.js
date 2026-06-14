const express = require("express")

const { googleAuth, logout } = require("../Controllers/auth.controller")

const authRouter = express.Router()

authRouter.post("/google", googleAuth)
authRouter.post("/logout", logout)


module.exports = authRouter