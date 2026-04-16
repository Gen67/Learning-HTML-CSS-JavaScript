function getFormattedTime(){ 
      
            const now = new Date(); 
            let hour = now.getHours().toString().padStart(2,0); 
            const meridiem = hour >= 12 ? "PM" : "AM";
            hour = hour % 12 || 12; 
            
            
            hour = hour.toString().padStart(2, 0); 
            const minute = now.getMinutes().toString().padStart(2,0); 
            const second = now.getSeconds().toString().padStart(2,0); 
            

            return `${hour}:${minute}:${second} ${meridiem} `;
}




function updateClock(){
            document.getElementById("time").textContent = getFormattedTime();
        }
updateClock(); 
setInterval(updateClock, 1000);



    
const timeStamp = document.querySelector('#time-holder');

timeStamp.addEventListener("submit", event => {
    event.preventDefault(); 
   
    const timestampDisplay = document.createElement('p'); 
    timestampDisplay.textContent = `${getFormattedTime()}`;
    timeStamp.appendChild(timestampDisplay); 
});

