const mongoose = require("mongoose")
let uri = "mongodb://localhost:27017/to_do_list"

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
    if (error) return console.log(`Error no banco de dados: \n${error}`) 
    console.log("Connected!")
})

mongoose.Promise = global.Promise

module.exports = mongoose