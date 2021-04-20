function handleLogin(event){
    return false // Para não recarregar a pagina 
}

document.getElementById("login-btn").addEventListener("click", function(e) {
    animateBtn(e)
    handleLogin(e)
})


function animateBtn(e){
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    let ripples = document.createElement('span');
    ripples.style.left = `${x}px`;
    ripples.style.top = `${y}px`;
    document.getElementById("login-btn").appendChild(ripples);

    setTimeout(() => { ripples.remove() }, 900)
    return false
}