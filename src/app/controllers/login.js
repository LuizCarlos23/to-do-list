
const Login = function (req, res){

    return {
        getLogin: async () => {
            return res.render("login")
        },

    }

}

module.exports = async function(req, res){
    const LoginControllers = new Login(req, res)
    if (req.method === "GET") return await LoginControllers.getLogin()
}