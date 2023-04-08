let now = new Date();

let li = document.querySelector("li");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

li.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
}
let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("New York");

function showTemp(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )} °F`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} mph`;

  let skyDescription = document.querySelector("#description");
  skyDescription.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function searchCity(city) {
  let apiKey = "987d5c128e2af6ec15f2042726b85661";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "987d5c128e2af6ec15f2042726b85661";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
