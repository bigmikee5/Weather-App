const apiKey = "UQ8If5dfIGaEcNL9wAKj91b6PsKXo2x7";

// get weather information
const getWeatherInfo = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${apiKey}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// get city information
const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${apiKey}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

getCity("lagos").then((data) => {
  return getWeatherInfo(data.Key);
});
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
