async function handleLogin(event){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    let result = await handleSubmit({email, password});
    // window.location.href = `http://localhost:3000/to_do?id=${result.id}`
    window.location.href = `http://localhost:3000/to_do`
    return false;
}

async function handleSubmit(content = {}){
    let headers = new Headers({"Content-Type": "application/json"});
    let data = JSON.stringify(content)
    return await fetch("http://localhost:3000/login", {
        "method": "POST",
        "headers": headers,
        "body": data
    }) 
        .then(result => result.json())
        .catch(err => console.log(err));
}

function animateBtn(e){
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    let ripples = document.createElement('span');
    ripples.style.left = `${x}px`;
    ripples.style.top = `${y}px`;
    document.getElementById("login-btn").appendChild(ripples);
    
    setTimeout(() => { ripples.remove() }, 900);
    return false;
}



document.getElementById("login-btn").addEventListener("click", function(e) {
    animateBtn(e)
    handleLogin(e)
})