const HelloWorld = function (req, res) {
    
    return {
        // Para requisições com metodo GET
        getHelloWorld: async () => {
            return res.end()
        }
    }

}

module.exports = async function(req, res){
    const HelloWorldControllers = new HelloWorld(req, res)

    if (req.method === "GET"){
        return HelloWorldControllers.getHelloWorld()
    }
}