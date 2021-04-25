const mongoose = require("mongoose")
const Bcrypt = require("bcryptjs");

const UsersSchema = new mongoose.Schema({
    usarname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

UsersSchema.pre("save",async function(next) {
    console.log(this)
    const hash = await Bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

const Users = mongoose.model("Users", UsersSchema)

module.exports = Users