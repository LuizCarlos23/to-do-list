const mongoose = require("mongoose")

const ToDoSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true,
    },
    checked: {
        type: Boolean,
        require: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const ToDo = mongoose.model("to_do", ToDoSchema)

module.exports = ToDo