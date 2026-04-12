 const weatherForm = document.querySelector(".weather-form");
 const cityInput = document.querySelector(".input-city");
 const card = document.querySelector(".card");
 const apiKey = "349a412071a8b8ef7a6fd00fc5affd68";
 
 
 
 
 weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
    const city = cityInput.value.trim(); 

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch(error){
                displayError("An error occurred while fetching the weather data. Please try again later.");
        } 

    } else{ 
        displayError("Please enter a city name.");
    }


 }) ; 



 async function getWeatherData(city){ 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl); 
    console.log(response); 


    if(!response.ok){
        throw new Error("Could Not Fetch Weather Data")
    }  

    return  await response.json(); 


}

 async function displayWeatherInfo(data){ 
    const { name: city, 
            main:{temp, humidity}, 
            weather: [{description, id}]} = data; 


    card.textContent = "" ; 
    card.style.display = "flex"; 

    const cityDisplay = document.createElement("h2");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city; 
        
        tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
        tempDisplay.classList.add("temperature"); 

        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        humidityDisplay.classList.add("humidity");

        descDisplay.textContent = description;
        descDisplay.classList.add("temperature");

       weatherEmoji.textContent = getWeatherIcon(id); 
        weatherEmoji.classList.add("weather-emoji");

        card.append(cityDisplay); 
        card.append(tempDisplay);
        card.append(humidityDisplay);
        card.append(descDisplay);
        card.append(weatherEmoji);


 }




 function getWeatherIcon(icon){ 

    switch(true){
        case icon >= 200 && icon < 300:
            return "⛈️";
        case icon >= 300 && icon < 400:
            return "🌧️";
        case icon >= 400 && icon < 500:
            return "🌦️";
        case icon >= 500 && icon < 600:
            return "🌧️";
        case icon >= 600 && icon < 700:
            return "❄️";
        case icon >= 700 && icon < 800:
            return "🌫️";
        case icon === 800:
            return "☀️";
        default:
            return "❓";
    }
}



async function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error-display");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}