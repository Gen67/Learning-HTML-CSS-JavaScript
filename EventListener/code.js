const box = document.getElementById("box");

box.addEventListener("click", clickBox);



function clickBox(event){
    box.style.backgroundColor = "lightblue";
    box.querySelector("h1");
    box.textContent = "I was Clicked!";
}