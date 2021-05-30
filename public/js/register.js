async function handleRegister(event){
    let email = document.getElementById("email").value;
    let usarname = document.getElementById("usarname").value;
    let password = document.getElementById("password").value;
    let rememberMe = document.getElementById("checkbox-remember-me").checked;

    let result = await handleSubmit({email, password, checked: rememberMe, usarname});

    return false; // Para não recarregar a pagina 
}

async function handleSubmit(content = {}){
    let headers = new Headers({"Content-Type": "application/json"});
    let data = JSON.stringify(content)
    return await fetch("http://localhost:3000/register", {
        "method": "POST",
        "headers": headers,
        "body": data
    })
        .then(result => {
            console.log(result)
            if (result.redirected) return window.location.href = result.url
            return result.json()
        }) .catch(err => console.log(err))
}

function animateBtn(e){
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    let ripples = document.createElement('span');
    ripples.style.left = `${x}px`;
    ripples.style.top = `${y}px`;
    document.getElementById("register-btn").appendChild(ripples);
    
    setTimeout(() => { ripples.remove() }, 900)
    return false
}



document.getElementById("register-btn").addEventListener("click", function(e) {
    animateBtn(e)
    handleRegister(e)
})