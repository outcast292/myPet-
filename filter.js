const registerBtn = document.querySelector(".register");
const registerPage = document.querySelector(".register-container");
registerBtn.addEventListener("click", register);
function register(){
    loginHolder.style.display="none";
    registerPage.style.display = "block";
}

const retourBtn = document.querySelector(".retour");
retourBtn.addEventListener("click", retour);
function retour(){
    registerPage.style.display = "none";
    loginHolder.style.display="block";
}