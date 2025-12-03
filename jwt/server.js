require('dotenv').config()
const app = require('./app')
const conncetDB = require('./Config/db')

PORT = process.env.PORT || 5000

conncetDB()

app.listen(PORT,(req,res)=>{
    console.log(`server connected successfull on port ${PORT}`)
})

// Backend response me Access-Control-Allow-Origin ka header missing hai       ---   header mans