function submitForm(event){
        event.preventDefault();
    }

console.log("hi from js file");
//Variables
const myLogin = document.querySelector(".login");
const loginHolder = document.querySelector(".login-container");
const myLanding = document.querySelector(".landing");
const closeBtn = document.querySelector(".close");
const scrollBtn = document.querySelector(".scrollup");


//Events Linteners
myLogin.addEventListener("click" , show);
closeBtn.addEventListener("click" , close);
scrollBtn.addEventListener("click" , scroll);

//Functions 
console.log("hi");

function show(e){
    loginHolder.style.display = "block" ;
    myLanding.style.display = "block";
}

function close(e){
    loginHolder.style.display = "none" ;
    myLanding.style.display = "none";
}

function scroll(e){
     window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if (scroll>100){
        scrollBtn.style.display= "block" ;
    }
    else{
        scrollBtn.style.display = "none" ;
    }
});

