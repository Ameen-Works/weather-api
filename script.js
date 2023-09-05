const fetchWeatherData = (countryName, alpha3Code) => {
  const apiKey = "ff0d22ea8d8d9a4bd03786bf0e22a17e  "; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}`;

  const weatherDetails = document.getElementById(alpha3Code); // Select the weather details div

  fetch(apiUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      // Handle the weather data, e.g., display it to the user
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      // alert(
      //   `Weather in ${countryName}: Temperature: ${temperature}°C, Description: ${description}`
      // );

      const weatherHTML = `<p>Temperature: ${temperature}°C</p><p>Description: ${description}</p>`;

      weatherDetails.innerHTML = weatherHTML;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again later.");
    });
};

const createCard = (data) => {
  const card = document.createElement("div");
  card.classList.add("container", "card");

  // Populate card content
  card.innerHTML = `
      <div class="topic">
      
        <h3>${data.name}</h3>
        
      </div>
      <div class="image-container">
        <img src="${data.flag}" alt="flag" />
      </div>
      <div class="country-info">
        <ul>
          <li>Capital: ${data.capital}</li>
          <li>Region: ${data.region}</li>
          <li>Country Code: ${data.alpha3Code}</li>
          <!-- You can add more properties here -->
        </ul>
      </div>
      <button id="myButton" class="get-weather">Click for Weather</button>
      <div id="${data.alpha3Code}"></div>      
    `;
  // Add an event listener to the button
  const getWeatherButton = card.querySelector(".get-weather");
  getWeatherButton.addEventListener("click", () => {
    // Handle the click event here, e.g., fetch weather data
    fetchWeatherData(data.name, data.alpha3Code);
    console.log(`Weather button clicked for ${data.name}`);
  });
  return card;
};
const cardContainer = document.querySelector(".container");

const fetchCountriesData = async () => {
  try {
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error Fetching Data: ", error);
    throw error;
  }
};

const populateCards = async () => {
  try {
    const data = await fetchCountriesData();
    data.forEach((countryData, index) => {
      const card = createCard(countryData, index);
      cardContainer.append(card);
    });
  } catch (error) {
    console.log("Error Populating Cards :", error);
  }
};

populateCards();
