const apiKey = "6f633a4b9c8dd95fb89c0299b0c79277";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#search input");
const searchBtn = document.querySelector("#search button");
const weatherIcon = document.querySelector("#weatherIcon");
const toggleBtn = document.querySelector("#toggleTemp"); // Add a toggle button in your HTML

let currentTempCelsius = null; // Store temperature in Celsius globally
let isCelsius = true; // Track the current temperature unit

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector("#error").style.display = "block";
    document.querySelector("#weather").style.display = "none";
  } else {
    let data = await response.json();

    document.querySelector("#city").innerHTML = data.name;
    currentTempCelsius = data.main.temp; // Save the temperature in Celsius
    updateTemperatureDisplay(); // Update the temperature display based on the unit

    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "mist.png";
    } else if (data.weather[0].main == "Snow"){
      weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1779/1779932.png"
    }


    document.querySelector("#weather").style.display = "block";
    document.querySelector("#error").style.display = "none";
  }
}

function updateTemperatureDisplay() {
  if (isCelsius) {
    document.querySelector("#temperature").innerHTML = Math.round(currentTempCelsius) + "°C";
  } else {
    const tempFahrenheit = (currentTempCelsius * 9) / 5 + 32;
    document.querySelector("#temperature").innerHTML = Math.round(tempFahrenheit) + "°F";
  }
}

toggleBtn.addEventListener("click", () => {
  isCelsius = !isCelsius; // Toggle the temperature unit
  updateTemperatureDisplay();
});

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});




// const apiKey = "6f633a4b9c8dd95fb89c0299b0c79277";
// const apiUrl =
//   "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// const searchBox = document.querySelector("#search input");
// const searchBtn = document.querySelector("#search button");
// const weatherIcon = document.querySelector("#weatherIcon");

// async function checkWeather(city) {
//   const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

//   if (response.status == 404) {
//     document.querySelector("#error").style.display = "block";
//     document.querySelector("#weather").style.display = "none";
//   } else {
//     let data = await response.json();

//     document.querySelector("#city").innerHTML = data.name;
//     document.querySelector("#temperature").innerHTML =
//       Math.round(data.main.temp) + "°c";
//     document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
//     document.querySelector("#wind").innerHTML = data.wind.speed + " km/h";

//     if (data.weather[0].main == "Clouds") {
//       weatherIcon.src = "clouds.png";
//     } else if (data.weather[0].main == "Clear") {
//       weatherIcon.src = "clear.png";
//     } else if (data.weather[0].main == "Rain") {
//       weatherIcon.src = "rain.png";
//     } else if (data.weather[0].main == "Drizzle") {
//       weatherIcon.src = "drizzle.png";
//     } else if (data.weather[0].main == "Mist") {
//       weatherIcon.src = "mist.png";
//     }

//     document.querySelector("#weather").style.display = "block";
//     document.querySelector("#error").style.display = "none";
//   }
// }

// searchBtn.addEventListener("click", () => {
//   checkWeather(searchBox.value);
// });





// const apiKey = ''; // Replace with your OpenWeatherMap API key
//     const weatherInfo = document.getElementById('weatherInfo');
//     const errorDiv = document.getElementById('error');
//     const cityInput = document.getElementById('cityInput');
//     const searchButton = document.getElementById('searchButton');
//     const unitToggle = document.getElementById('unitToggle');
//     let isCelsius = true;

//     searchButton.addEventListener('click', () => {
//       const city = cityInput.value.trim();
//       if (!city) {
//         showError('Please enter a city name.');
//         return;
//       }
//       fetchWeather(city);
//     });

//     unitToggle.addEventListener('click', () => {
//       const tempValue = document.getElementById('tempValue');
//       const tempUnit = document.getElementById('tempUnit');
//       const temperature = parseFloat(tempValue.textContent);

//       if (isNaN(temperature)) return;

//       if (isCelsius) {
//         tempValue.textContent = ((temperature * 9/5) + 32).toFixed(2);
//         tempUnit.textContent = '°F';
//       } else {
//         tempValue.textContent = ((temperature - 32) * 5/9).toFixed(2);
//         tempUnit.textContent = '°C';
//       }
//       isCelsius = !isCelsius;
//     });

//     function fetchWeather(city) {
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//       fetch(url)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('City not found');
//           }
//           return response.json();
//         })
//         .then(data => displayWeather(data))
//         .catch(err => showError(err.message));
//     }

//     function displayWeather(data) {
//       errorDiv.textContent = '';
//       weatherInfo.style.display = 'block';

//       const { name } = data;
//       const { temp } = data.main;
//       const { description, icon } = data.weather[0];
//       const { humidity, speed } = data.wind;

//       document.getElementById('cityName').textContent = name;
//       document.getElementById('tempValue').textContent = temp.toFixed(2);
//       document.getElementById('weatherDescription').textContent = description;
//       document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${icon}.png`;
//       document.getElementById('additionalInfo').textContent = `Humidity: ${data.main.humidity}% | Wind Speed: ${data.wind.speed} m/s`;
//     }

//     function showError(message) {
//       errorDiv.textContent = message;
//       weatherInfo.style.display = 'none';
//     }