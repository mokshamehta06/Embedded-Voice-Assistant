const jwt = require("jsonwebtoken");

const isAuth = async (req,res,next) => {
    try{
        const token = req.cookies.token;
        if (!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!verifyToken){
            return res.status(401).json({message:"doesnt have valid token"});
        }
        req.userId = verifyToken.userId;
        req.user = verifyToken;
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}
module.exports = isAuth;
