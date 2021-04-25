const Bcrypt = require("bcryptjs")
const Users = require("../models/Users")

const Register = function (req, res){

    return {
        getRegister: async () => {
            return res.render("register")
        },
        postRegister: async () => {
            try {   
                console.log(req.body)
                if (!req.body || req.body == [] || !req.body.email || !req.body.password){
                    return res.status(400).json({"error": true, "message": "Invalid input",})
                }
                let result = await Users.create(req.body)
                return res.redirect("http://localhost:3000/login")
            } catch (e){
                console.log(e)
                return res.status(500).json({"error": true, "message": "Internal error"})
            }

        }

    }

}

module.exports = async function(req, res){
    const RegisterControllers = new Register(req, res)
    if (req.method === "GET") return await RegisterControllers.getRegister()
    if (req.method === "POST") return await RegisterControllers.postRegister()
}