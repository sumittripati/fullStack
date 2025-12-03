let express = require('express')
const router = express.Router()
const {register, login, logout, changePassword} = require('../Controllers/authController')
const protect = require('../Middleware/authMiddleware')

router.post('/register',register)
router.post('/login',login)
router.get("/logout", protect, logout);
router.put("/change-password", protect, changePassword);


module.exports = router;