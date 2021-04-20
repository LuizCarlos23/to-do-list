async function saveData(){
    let input = document.getElementById("inputToDo");
    let contentToDo = document.getElementById("inputToDo").value;

    if (contentToDo.trim() == "") return input.focus();

    handleSubmit(contentToDo, "save")
      .then(result => {
        addItem(contentToDo, result.id);
      })
      .catch(err => console.log(err));

    input.focus();
    input.value = "";
}

function addItem(contentToDo, id){
    let itemElement = document.getElementById("toDoList");

    let div_item = document.createElement("div");
    div_item.setAttribute("class", "item");
    div_item.setAttribute("id", `item_${id}`);

    let div_check = document.createElement("div");
    div_check.setAttribute("class", "check");

    let div_delete = document.createElement("div");
    div_delete.setAttribute("class", "delete");


    let input_check = document.createElement("input");
    input_check.setAttribute("class", "checkbox");
    input_check.setAttribute("type", "checkbox");
    input_check.setAttribute("id", id);

    let label = document.createElement("label");
    label.setAttribute("class", "text");
    label.setAttribute("for", id);
    label.innerText = contentToDo;

    let input_button = document.createElement("input");
    input_button.setAttribute("class", "deleteButton");
    input_button.setAttribute("type", "button");
    input_button.setAttribute("data-id", id);
    input_button.value = "X"
    input_button.addEventListener("click", (event) => deleteItem(event))

    div_check.appendChild(input_check);
    div_check.appendChild(label);

    div_delete.appendChild(input_button);

    div_item.appendChild(div_check);
    div_item.appendChild(div_delete);

    itemElement.appendChild(div_item);

    //  >> ESTRUTURA QUE SERA CRIADA:
    //  <div class="item">
    //      <div class="check" >
    //          <input type="checkbox" class="checkbox" id="${id}">
    //          <label class="text" for="${id}">${contentToDo}</label>
    //      </div>
    //      <div class="delete">
    //          <input type="button" class="deleteButton" value="X">
    //      </div>
    //  </div>

    
}

async function deleteItem(event){
    let id = event.target.attributes["data-id"].value;
    let div_item = document.getElementById(`item_${id}`);
    div_item.parentNode.removeChild(div_item);

    handleSubmit(id, "delete")
        .then(result => {
            return result.json();
        })
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err));
}

async function updateItens(){
    let checkboxes = document.getElementsByClassName("checkbox")
    let itens = []
    Array.prototype.filter.call(checkboxes, element => {
      itens.push({
        id: element.attributes.id.nodeValue,
        checked: element.checked,
      })
    })
    handleSubmit(itens, "update")
}

async function handleSubmit(content, op = "save"){
    let data = {content};
    let headers = new Headers({"Content-Type": "application/json"});
    console.log(op)
    if (op == "save"){
      return await fetch("http://localhost:3000/to_do", {
          "method": "POST",
          "headers": headers,
          "body": JSON.stringify(data)
      }).then(result => {
        return result.json();
      })
    } else if (op == "delete"){
      return await fetch("http://localhost:3000/to_do", {
            "method": "DELETE",
            "headers": headers,
            "body": JSON.stringify(data)
      })  
    } else if (op == "update"){
      return await fetch("http://localhost:3000/to_do", {
            "method": "PUT",
            "headers": headers,
            "body": JSON.stringify(data)
      })
    }
}

let delete_buttons = document.getElementsByClassName("deleteButton");
Array.from(delete_buttons).forEach((element) => {
  element.addEventListener("click", (event) => deleteItem(event))
})