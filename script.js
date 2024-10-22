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

//CREATE FUNCTION TO FORMAT DATE
function formatDay(timestamp) { //STEP 58 - create new format to edit forecast date & send it timestamp - add formatDay to interpolated forecastDay.dt
    let date = new Date(timestamp * 1000); //STEP 59 - converting timestamp
    let day = date.getDay(); //STEP 60 - must create array so that day return is words and not numbers
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; //STEP 61 create array 

    return days[day]; //STEP 62 - this will convert the long time number to shortened days
}

//CREATE FUNCTION TO SHOW THE FORECAST
function displayForecast(response) { //STEP 39 - create displayForecast function  & paste HTML forecast code between backticks ``;] - STEP 54 add response as parameter
    let forecast = response.data.daily; //STEP 55 - shows daily forecast STEP 56 - store response.data.daily in variable, forecast
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`; //STEP 41 - set variable forecastHTML = to empty string  - move HTML code into forecastHTML - STEP 43 - move <div class="row"> withn backticks
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon"]; //STEP 45 - create array to loop forecast HTML
    forecast.forEach(function (forecastDay, index) { //STEP 46 - use foreEach so loop repeats and insert the forecastHTML=forecastHTML+... b/w brackets //STEP 57 - change start of loop and function from days to forecast & forecastDay //STEP 63 - add 2nd paramter, index
        if (index < 6) { //STEP 64 - will display only indexes 0-5 and hide 6+
            forecastHTML = forecastHTML + `  
                    
                        <div class="col-2">
                            <div class="weather-forecast-date">
                                ${formatDay(forecastDay.dt)}
                            </div>
                            <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42" />
                            <div class="weather-forecast-temperatures">
                                <span class="weather-forecast-temperature-max ms-1">
                                    ${Math.round(forecastDay.temp.max)}</span>
                                <span class="weather-forecast-temperature-min ms-1">
                                    ${Math.round(forecastDay.temp.min)}</span>
                            </div>
                        </div>
                `;
        }
    })

    forecastHTML = forecastHTML + `</div>`; //STEP 44 - remember to close the div
    forecastElement.innerHTML = forecastHTML; //STEP 42 - set the HTML code = to forecastHTML
}

//CREATE FUNCTION THAT OBTAINS FORECAST FROM OTHER CITIES USING API
function getForecast(coordinates) { //STEP 48 - create function getForecast to receive coordinates, sent from displayTemp(response), which returns city coords 
    let apiKey = "ab6da5069e5bc23122a387b3e99bd05b"; //STEP 50 - copy/paste apiKey statement from step 1
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`; ////STEP 49 - add apiUrl, remove &exclude{part}, interpolate apiKey & coordinates.lat/lon & add units=metric
    axios.get(apiUrl).then(displayForecast); //STEP 53 - make API call and trigger displayForecast function
}

//CREATE FUNCTION THAT SHOWS CURRENT WEATHER CONDITIONS (WIND, HUMIDITY, DESCRIPTION, TEMP, ICON) OF SELECTED CITY
function displayWeatherCondition(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");


    //Step 7 - target icon to change along w/ weather description

    celsiusTemperature = response.data.main.temp; //STEP 27 - set celsiusTemperature variable = to path w/ Celsius temp in API

    //UPDATE HTML BASED ON THE RESPONSE.DATA
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name; //this is where city name is shown in object 
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); //Step 8 - use setAttribute() function to inject icon link into src
    iconElement.setAttribute("alt", response.data.weather[0].description); //Step 9 - set alt equal to description so that shows in console element

    getForecast(response.data.coord); //STEP 47 - call getForecast and send the response.data.coord
}

//CREATE FUNCTION THAT ALLOWS SEARCH BUTTON TO SEARCH CITIES USING API
function searchCity(city) {
    let apiKey = "ab6da5069e5bc23122a387b3e99bd05b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeatherCondition);
}

//CREATE FUNCTION THAT ACTIVATES WHEN THE BUTTON IS SEARCHED
function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}

//CREATE FUNCTION THAT SEARCHES DEVICE LOCATION USING API
function searchLocation(position) {
    let apiKey = "ab6da5069e5bc23122a387b3e99bd05b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude
        }&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(displayWeatherCondition);
}

//CREATE FUNCTION THAT OBTAINS THE CURRENT DEVICE LOCATION
function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");

