let express = require('express')
const router = express.Router()
const cardController = require('../Controllers/addCardController')
const protect = require('../Middleware/authMiddleware')

router.get('/card',protect, cardController)

module.exports = router;