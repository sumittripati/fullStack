const mongoose = require('mongoose')

const DB_URL = process.env.DATABASE_URL;

const conncetDB = async () => {
    try {
        await mongoose.connect(DB_URL)
        console.log("database connected successfully")
    } catch (error) {
        console.log("database connection failed", error)
        process.exit(1)
    }
}

module.exports = conncetDB;