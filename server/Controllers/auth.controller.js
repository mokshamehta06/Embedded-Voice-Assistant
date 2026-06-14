const { genToken } = require("../Config/token");
const User = require("../Models/user.model");

const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body
        if (!name || !email) {
            return res.status(400).json({ message: "Name and Email are required" })

        }
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({
                name, email
            })
        }
        const token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `Google auth error ${error}` })
    }
}

const logout = async (req, res) => {
    try {
        await res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({ message: "Logout success" })
    }
    catch (error) {
        return res.status(500).json({ message: `Logout Failed` })
    }
}

module.exports = {
    googleAuth,
    logout
}