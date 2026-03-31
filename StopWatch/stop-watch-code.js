const timerDisplay = document.getElementById("stop-watch");
let timer = null; 
let startTimer = 0;
let elapsedTime = 0; 
let isRunning = false; 


function startTime(){ 
    if(!isRunning){
        startTimer = Date.now() - elapsedTime; 
        timer = setInterval(updateTime, 10);
        isRunning = true; 
    }
}

function stopTime(){ 
if(isRunning){
    clearInterval(timer); 
    elapsedTime = Date.now() - startTimer; 
    isRunning = false; 
}


}

function resetTime(){ 
    timerDisplay.textContent = "00:00:00:00";
    clearInterval(timer)
    startTimer = 0;
    elapsedTime = 0; 
    isRunning = false; 

}

function updateTime(){ 
    const currentTime = Date.now(); 
    elapsedTime = currentTime - startTimer; 

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60); 
    let seconds =Math.floor( elapsedTime / 1000 % 60); 
    let milliseconds = Math.floor(elapsedTime % 1000 / 10); 

        hours = String(hours).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        milliseconds = String(milliseconds).padStart(2,"0");


    timerDisplay.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`; 

}