const express = require("express")
const db = require("./database")
const mongoose = require("mongoose")

const routes = require("./routes")
const exphbs = require('express-handlebars');

const App = function () {
    let app = express()

    function router(){
        app.use("/", routes)
        app.use("/static", express.static("public"))
    }

    function middleware(){
        

    }

    function enginer(){
        app.engine("hbs", exphbs({
            defaultLayout: "main",
            extname: ".hbs",
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },
        }))
        app.set("view engine", "hbs")
    }
    
    router()
    middleware()
    enginer()

    return app
}

module.exports = App()