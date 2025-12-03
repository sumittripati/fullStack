const mongoose = require("mongoose");

let curdSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

let curd = mongoose.model("curd", curdSchema);

module.exports = curd;