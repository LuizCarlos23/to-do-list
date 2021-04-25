const ToDo = require("../models/ToDo")
const { Types } = require("mongoose")
const ToDoList = function (req, res) {
    
    return {
        // Para requisições com metodo GET
        getToDoList: async () => {
            try {
                console.log("User: ", req.session.user)
                if (!req.session || !req.session.user) return res.redirect("http://localhost:3000/login")
                let id = req.session.user.user_id
                let to_do_list = await ToDo.find({user_id: Types.ObjectId(id)}).select(["_id","content", "checked"])
                return res.render('home', {to_do_list} )
            } catch (error) {
                console.log(error)
                return res.redirect("http://localhost:3000/login")
            }
            
        },

        // Para requisições com metodo POST
        postToDoList: async () => {
            req.body.user_id = Types.ObjectId(req.session.user.user_id)
            const result = await ToDo.create(req.body)
            console.log("To DO:", req.body)
            return res.json({"id": result.id})
        },

        // Para requisições com metodo Delete
        deleteToDo: async () => {
            let id = req.body.content
            await ToDo.deleteOne({_id: Object(id)})
            return res.send()
        },
 
        updateToDo: async () => {
            console.log(req.body)
            await req.body.content.map(async item => {
                await ToDo.updateOne({_id: Object(item.id)}, {checked: item.checked})
            })
            return res.send()
        },
    }

}

module.exports = async function(req, res){
    const toDoListControllers = new ToDoList(req, res)

    if (req.method === "GET"){
        return toDoListControllers.getToDoList()
    } else if (req.method === "POST") {
        return toDoListControllers.postToDoList()
    } else if (req.method === "PUT") {
        return toDoListControllers.updateToDo()
    } else if (req.method === "DELETE"){
        return toDoListControllers.deleteToDo()
    }
    
}