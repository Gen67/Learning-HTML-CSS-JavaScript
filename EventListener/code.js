const box = document.getElementById("box");

box.addEventListener("click", clickBox);
box.addEventListener("mouseover", clickBox2);



function clickBox(event){
    box.style.backgroundColor = "lightblue";
    box.querySelector("h1");
    box.textContent = "I was Clicked!";
}


function clickBox2(event){
    box.style.backgroundColor = "yellow";
    box.querySelector("h1");
    box.textContent = "Don't Touch Me!";
}


