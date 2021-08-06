let now = new Date(); //(1) must use the new Date variable to get current date/time 
let dayTime = document.querySelector("#date"); //(2) select element w/ id "day-time" - this is where time will display
let hour = now.getHours(); //(3) get hour variable
let minute = now.getMinutes(); //(4) get minute variable 
let year = now.getFullYear();
let date = now.getDate();
let days = [ //(5) create array of days 
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let day = days[now.getDay()]; //(6) create new day variable using array "days" and now.getDay() - the typical variable that shows Days

let months = [ //created month arrays 
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
let month = months[now.getMonth()];


dayTime.innerHTML = `${day}, ${month} ${date}, ${year} ${hour}:${minute}`;


function displayWeatherCondition(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");


    //Step 7 - target icon to change along w/ weather description

    celsiusTemperature = response.data.main.temp; //STEP 27 - set celsiusTemperature variable = to path w/ Celsius temp in API

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name; //this is where city name is shown in object 
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); //Step 8 - use setAttribute() function to inject icon link into src
    iconElement.setAttribute("alt", response.data.weather[0].description); //Step 9 - set alt equal to description so that shows in console element
}

function searchCity(city) {
    let apiKey = "ab6da5069e5bc23122a387b3e99bd05b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}


function showFahrenheit(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiuslink.classList.remove("active");
    fahrenheitlink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32; //STEP 24/28 - set new variable fahrenheitTemperature = to celsiustemp * conversion formula (stops formula from repeating) 
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}


function showCelsiusTemp(event){
    event.preventDefault();
    celsiuslink.classList.add("active");
    fahrenheitlink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


function searchLocation(position) {
    let apiKey = "ab6da5069e5bc23122a387b3e99bd05b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude
        }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", showFahrenheit);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", showCelsiusTemp);


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");