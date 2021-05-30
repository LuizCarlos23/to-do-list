const Users = require("../models/Users");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const Login = function (req, res){

    return {
        getLogin: async () => {
            return res.render("login")
        },
        postLogin: async () => {
            try {
                let user = await Users.findOne({ email: req.body.email }).select(["_id", "password"]);
                // console.log(req.headers)
                if(!user) {
                    return res.status(400).send({ message: "Invalid user" });
                }
                if(!Bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(400).send({ message: "Invalid user" });
                }
                let token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_TOKEN_KEY);
                let update = await Users.updateOne({_id: Object(user._id)}, {token})
                if(!update) return res.status(500).send({ message: "Internal error" });
                return res.send({ token: `Bearer ${token}` });
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