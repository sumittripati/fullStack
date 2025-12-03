const jwt = require('jsonwebtoken')
const User = require('../Models/useSchema')

const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        if(!token){
            return res.status(401).json({
            success: false,
            message: "Not authorized. Token missing.",});
        }
         // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user & remove password
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
       console.log("token not valid for this user",error);
       return res.status(401).json({
       success: false,
       message: "Not authorized. Token invalid.",});
    }
}

module.exports = protect;