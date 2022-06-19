function submitForm(event) {
    event.preventDefault();
}

console.log("hi from js file");
//Variables
const myLogin = document.querySelector(".login");
const loginHolder = document.querySelector(".login-container");
const myLanding = document.querySelector(".landing");
const closeBtn = document.querySelector(".close");
const scrollBtn = document.querySelector(".scrollup");
const username_input = document.querySelector("#username");
const password_input = document.querySelector("#password");


const fullname_register = document.querySelector("#name_register");
const email_register = document.querySelector("#email_register");
const password_register = document.querySelector("#password_register");
const tel_register = document.querySelector("#tel_register");


//Events Linteners
myLogin.addEventListener("click", show);
closeBtn.addEventListener("click", close);
scrollBtn.addEventListener("click", scroll);

//Functions 
console.log("hi");

function show(e) {
    loginHolder.style.display = "block";
    myLanding.style.display = "block";
}

function close(e) {
    loginHolder.style.display = "none";
    myLanding.style.display = "none";
}

function scroll(e) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll > 100) {
        scrollBtn.style.display = "block";
    }
    else {
        scrollBtn.style.display = "none";
    }
});


async function login() {
    const rawResponse = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: username_input.value, password: password_input.value })
    });
    const content = await rawResponse.json();

    if(content.code==200){
        toastr["success"](content.msg)
    }
    else{
        toastr.error(content.msg);
        
    }

}

async function register(){

    const rawResponse = await fetch('http://localhost:5000/createUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: email_register.value,fullname: fullname_register.value, password: password_register.value , tel:tel_register.value })

    });
    const content = await rawResponse.json();

    if(content.code==201){
        toastr["success"](content.msg)
    }
    else{
        toastr.error(content.msg);
        
    }

}
