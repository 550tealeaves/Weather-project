//Step 1 - build the part that shows current date/time
let now = new Date(); //(1) must use the new Date variable to get current date/time 
let dayTime = document.querySelector("#day-time"); //(2) select element w/ id "day-time" - this is where time will display
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
dayTime.innerHTML = `${day}, ${month} ${date}, ${year} ${hour}:${minute}`; //(7) use new variables to modify the HTML to show the day and time

//Step 2 - build the search engine that lets you type in a city name and it appears in the 1
function showCitySearch(event) { //(3) create function that will be called by eventListener
    event.preventDefault(); //(4) prevent default action of form reloading page
    let showCity = document.querySelector("#search-city-text"); //(5) step 3 is targeting the element input
    let h1 = document.querySelector("h1"); //(6) select h1 to modify the element
    if (showCity.value.length > 0) {  //(7) entry is valid if it has at least 1 character
        h1.innerHTML = `${showCity.value}`; //(8) display the entry from step 7 in the h1
    }
}
let citySearch = document.querySelector("#city-search"); //(1) select form
citySearch.addEventListener("submit", showCitySearch); //(2) add eventListener via click that will call a function showCitySearch

//Step 3 - build the temperature API 
let apiKey = "ab6da5069e5bc23122a387b3e99bd05b";
let city = "Havana";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
function showTemp(response) {
    let newTemp = Math.round(response.data.main.temp);
    let changingTemp = document.querySelector("#temperature");
    changingTemp.innerHTML = `${newTemp}`;
    console.log(response.data);
}
let searchCity = document.querySelector("#search-city-button");
searchCity.addEventListener("submit", showTemp);
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);

//Step 4 - build the Geolocation API for the current tab
function currentWeather(event) {
    event.preventDefault();
    let locationTemperature = Math.round(22.7);
    let weatherHere = document.querySelector("#temperature");
    weatherHere.innerHTML = `${locationTemperature}`;
}
function findLocation(position) {
    console.log(position);
    let myPosition = document.querySelector("#current-location-button");
    myPosition.addEventListener("click", currentWeather);
}
navigator.geolocation.getCurrentPosition(findLocation);