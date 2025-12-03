let express = require('express')
const router = express.Router()
const {getItem, createItem, updateItem, deleteItem} = require('../../Controllers/CURD/curd')
const protect = require('../../Middleware/authMiddleware')

router.get('/getitem',getItem)
router.post('/createitem',createItem)
router.put("/putitem/:id", updateItem);
router.delete("/deleteitem/:id", deleteItem);


module.exports = router;