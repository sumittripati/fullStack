const jwt = require('jsonwebtoken')

const createToken = (id)=>{
   try {
    return jwt.sign(
    {id},
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN })
   } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Failed to create token")
   }
}

module.exports = createToken;