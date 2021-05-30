const Users = require("../models/Users")

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.cookie.split("=")[1]
    const jwt = require("jsonwebtoken")
    // verificar se existe token no header
    try {
      if(!authHeader) return res.status(401).send({error: true, "message": "No token provided"})
    
      // Verificar se é o formato de um token valido
      let parts = authHeader.split(' ')
      if(!parts.length === 2) return res.status(401).send({error: true, "message": "Token error"})
      const [scheme, token] = parts

      if(!/^Bearer$/i.test(scheme)) return res.status(401).send({error: true, "message": "Token malformatted"})  
  
      jwt.verify(token, process.env.PRIVATE_TOKEN_KEY, async (err, decoded) => {
        // TODO: Criar log de error
        if (err) return res.status(401).send({error: true, "message": "Token invalid"})
        
        let {token: user_token} = await Users.findOne({_id: Object(decoded.user_id)}).select(["token"]);
        req.token_decoded = decoded
        if (user_token == token) return next() // Verifica se o token está salvo no banco
        
        return res.status(401).send({error: true, "message": "Invalid Token"})
      })
    } catch (error) {
      console.log("!! Error ao verificar o token !!")
      return res.status(500).send({error: true, "message": "Token invalid"})
    }
    
  }