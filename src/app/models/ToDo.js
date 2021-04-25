const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ToDoSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
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

ToDoSchema.pre("save", function(next) {
    // this.user_id.push()
    console.log(this)
    next()
})


const ToDo = mongoose.model("ToDo", ToDoSchema)

module.exports = ToDo