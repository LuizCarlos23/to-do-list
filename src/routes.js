const express = require("express")
const routes = express.Router()

routes.use(express.json())
routes.use(express.urlencoded({ extended: true }))

const to_do_list_controllers = require("./app/controllers/toDoList")
const login_controllers = require("./app/controllers/login")
// const hello_world_controllers = require("./app/controllers/hello_world")

routes.all("/to_do", to_do_list_controllers)
routes.all("/login", login_controllers)

module.exports = routes
