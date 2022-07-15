let currentTime = new Date();
let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let hour = String(currentTime.getHours()).padStart(2, "0");
let minute = String(currentTime.getMinutes()).padStart(2, "0");
//padStart pads the current string with another string until
//the resulting string reaches the given length
//(in my case reaches length of two and add 0 for it)

h2.innerHTML = `${day} ${hour}:${minute}`;

//to display on the forecast
function showSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let apiKey = "b5fbcef1543bc4503e1a5412457235aa";
  let link = "https://api.openweathermap.org/data/2.5/weather?";
  let city = `${searchInput.value}`;
  let units = "metric";
  let apiUrl = `${link}q=${city}&appid=${apiKey}&units=${units}`;

  function showInfo(response) {
    let description = response.data.weather[0].main;
    let descrElement = document.querySelector("#descr");
    descrElement.innerHTML = `${description}`;

    let temp = Math.round(response.data.main.temp);
    let tempElement = document.querySelector("#main-temp");
    tempElement.innerHTML = `${temp}°C`;

    let realFeel = Math.round(response.data.main.feels_like);
    let realFeelEL = document.querySelector("#real-feel");
    realFeelEL.innerHTML = `RealFeel ${realFeel}°C`;

    let windSpeed = Math.round(response.data.wind.speed);
    let windSpeedKm = Math.round(windSpeed * 3.6);
    let windEL = document.querySelector("#wind");
    windEL.innerHTML = `${windSpeedKm} km/h`;

    let humidity = Math.round(response.data.main.humidity);
    let humidityEl = document.querySelector("#humidity");
    humidityEl.innerHTML = `${humidity} %`;

    let sunriseTime = Math.round(response.data.sys.sunrise);
    let dateRise = new Date(sunriseTime * 1000);
    let hoursRise = String(dateRise.getHours()).padStart(2, "0");
    let minutesRise = String(dateRise.getMinutes()).padStart(2, "0");
    let preciseSunrise = `${hoursRise} : ${minutesRise}`;
    let sunriseTimeEl = document.querySelector("#sunrise");
    sunriseTimeEl.innerHTML = `${preciseSunrise}`;

    let sunsetTime = Math.round(response.data.sys.sunset);
    let dateSet = new Date(sunsetTime * 1000);
    let hoursSet = String(dateSet.getHours()).padStart(2, "0");
    let minutesSet = String(dateSet.getMinutes()).padStart(2, "0");
    let preciseSet = `${hoursSet} : ${minutesSet}`;
    let preciseSetEl = document.querySelector("#sunset");
    preciseSetEl.innerHTML = `${preciseSet}`;
  }
  axios.get(apiUrl).then(showInfo);
}
let searchLine = document.querySelector("form");
searchLine.addEventListener("submit", showSearch);
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", showSearch);

//make current-button work
function showCurrentPlace(position) {
  let apiKey = "b5fbcef1543bc4503e1a5412457235aa";
  let link = "https://api.openweathermap.org/data/2.5/weather?";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `${link}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  function showInfo(response) {
    let cityName = response.data.name;
    let showCity = document.querySelector("h1");
    showCity.innerHTML = `${cityName}`;

    let description = response.data.weather[0].main;
    let descrElement = document.querySelector("#descr");
    descrElement.innerHTML = `${description}`;

    let temp = Math.round(response.data.main.temp);
    let tempElement = document.querySelector("#main-temp");
    tempElement.innerHTML = `${temp}°C`;

    let realFeel = Math.round(response.data.main.feels_like);
    let realFeelEL = document.querySelector("#real-feel");
    realFeelEL.innerHTML = `RealFeel ${realFeel}°C`;

    let windSpeed = Math.round(response.data.wind.speed);
    let windSpeedKm = Math.round(windSpeed * 3.6);
    let windEL = document.querySelector("#wind");
    windEL.innerHTML = `${windSpeedKm} km/h`;

    let humidity = Math.round(response.data.main.humidity);
    let humidityEl = document.querySelector("#humidity");
    humidityEl.innerHTML = `${humidity} %`;

    let sunriseTime = Math.round(response.data.sys.sunrise);
    let dateRise = new Date(sunriseTime * 1000);
    let hoursRise = String(dateRise.getHours()).padStart(2, "0");
    let minutesRise = String(dateRise.getMinutes()).padStart(2, "0");
    let preciseSunrise = `${hoursRise} : ${minutesRise}`;
    let sunriseTimeEl = document.querySelector("#sunrise");
    sunriseTimeEl.innerHTML = `${preciseSunrise}`;

    let sunsetTime = Math.round(response.data.sys.sunset);
    let dateSet = new Date(sunsetTime * 1000);
    let hoursSet = String(dateSet.getHours()).padStart(2, "0");
    let minutesSet = String(dateSet.getMinutes()).padStart(2, "0");
    let preciseSet = `${hoursSet} : ${minutesSet}`;
    let preciseSetEl = document.querySelector("#sunset");
    preciseSetEl.innerHTML = `${preciseSet}`;
  }

  axios.get(apiUrl).then(showInfo);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPlace);
}

let homeButton = document.querySelector("#current-button");
homeButton.addEventListener("click", getCurrentPosition);
//
