const Users = require("../models/Users");
const Bcrypt = require("bcryptjs");
const Login = function (req, res){

    return {
        getLogin: async () => {
            return res.render("login")
        },
        postLogin: async () => {
            try {
                let user = await Users.findOne({ email: req.body.email }).select(["_id", "password"]);
                if(!user) {
                    return res.status(400).send({ message: "Invalid user" });
                }
                if(!Bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(400).send({ message: "Invalid user" });
                }

                req.session.user = {}
                req.session.user.user_id = user._id

                return res.send({ id: user._id });   
            } catch (error) {
                console.log(error)
                return res.status(500).json({ "Error" : true});   
            }
            
        }
    }

}

module.exports = async function(req, res){
    const LoginControllers = new Login(req, res)
    if (req.method === "GET") return await LoginControllers.getLogin()
    if (req.method === "POST") return await LoginControllers.postLogin()
}