const express = require("express")
const cookieSession = require('cookie-session')
const routes = express.Router()

routes.use(express.json())
routes.use(express.urlencoded({ extended: true }))


routes.use(cookieSession({
    secret: process.env.COOKIE_SECRET || 'teste',
    name: "session",
    maxAge: 30 * 1000
}))

const hello_world = require("./app/controllers/helloWorld")
const to_do_list_controllers = require("./app/controllers/toDoList")
const login_controllers = require("./app/controllers/login")
const register_controllers = require("./app/controllers/register")
// const hello_world_controllers = require("./app/controllers/hello_world")

routes.all("/", hello_world)
routes.all("/register", register_controllers)
routes.all("/to_do", to_do_list_controllers)
routes.all("/login", login_controllers)
module.exports = routes
