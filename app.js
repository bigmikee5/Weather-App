const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".iconSrc");

// updating the UI
const updateUI = (data) => {
  // destructure properties
  const { cityDetails, weather } = data;

  // update details template
  details.innerHTML = `
          <h5>${cityDetails.EnglishName}</h5>
          <div class="condition">${weather.WeatherText}</div>
          <div class="temperature">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>  
  `;
  // update the night and day and icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "img/day.svg";
  } else {
    timeSrc = "img/night.svg";
  }
  time.setAttribute("src", timeSrc);

  // display the card details by removing the none class
  if (card.classList.contains("remove")) {
    card.classList.remove("remove");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeatherInfo(cityDetails.Key);

  return {
    cityDetails,
    weather,
  };
};
cityForm.addEventListener("submit", (e) => {
  //prevent default action
  e.preventDefault();

  // get the city value/name from the user input
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the UI with the new city value/name
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
