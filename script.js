const apiKey = "6cceaffb517452ed61a970df2eaea528";
const cityInput = document.querySelector("#city_input");
const formEl = document.querySelector("form");
const weatherData = document.querySelector(".weather_data");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const cityValue = cityInput.value;
    
    getWeatherData(cityValue);
})

const getWeatherData = async (cityValue) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);

        if(!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        const icon = data.weather[0].icon;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity} %`,
            `Wind speed ${Math.round(data.wind.speed)} m/s`
        ];

        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

        weatherData.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherData.querySelector(".description").textContent = description;

        weatherData.querySelector(".details").innerHTML = details
            .map((detail) => `<div>${detail}</div>`).join("");

    } catch (error) {
        weatherData.querySelector(".icon").innerHTML = "";

        weatherData.querySelector(".temperature").textContent = "";

        weatherData.querySelector(".description").textContent = "An error happed, please try again";

        weatherData.querySelector(".details").innerHTML = "";
    }
}