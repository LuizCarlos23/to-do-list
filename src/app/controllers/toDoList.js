const ToDo = require("../models/ToDo")

const ToDoList = function (req, res) {

    return {
        // Para requisições com metodo GET
        getToDoList: async () => {
            let list = await ToDo.find().exec()
            let to_do_list = []
            list.map(item => {
                to_do_list.push({
                    id: item._id,
                    checked: item.checked,
                    content: item.content,
                })
            })
            console.log(list)
            return res.render('home', {to_do_list} )
        },

        // Para requisições com metodo POST
        postToDoList: async () => {
            const result = await ToDo.create(req.body)
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