import getWeatherData from './getWeatherData';

// getWeatherData('Vilnius', 'us');

// renderEvents function that contains event listeners

export default function displayResponse() {
  // const cachedElements = cacheElements();
  cacheElements().searchBtn().addEventListener('click', processResponse);
  cacheElements()
    .mySearch()
    .addEventListener('keypress', e => {
      if (e.key === 'Enter') processResponse();
    });
}

async function processResponse() {
  const cachedElements = cacheElements();
  const inputEntered = cachedElements.mySearch().value;
  if (inputEntered.trim() !== '') {
    const response = await getWeatherData(inputEntered, 'metric');
    if (typeof response === 'string' || response instanceof String) {
      cachedElements.conditionsDisplay().textContent = response;
    } else {
      const {
        location,
        conditions,
        currentTemp,
        feelsLike,
        windSpeed,
        humidity,
      } = response;
      cachedElements.locationDisplay().textContent = location;
      cachedElements.conditionsDisplay().textContent = conditions;
      cachedElements.currentTempDisplay().textContent = currentTemp;
      cachedElements.feelsLikeDisplay().textContent = feelsLike;
      cachedElements.windSpeedDisplay().textContent = windSpeed;
      cachedElements.humidityDisplay().textContent = humidity;
    }
  }
}

function cacheElements() {
  const mySearch = () => document.querySelector('#city-search');
  const searchBtn = () => document.querySelector('.svg-container');
  const locationDisplay = () => document.querySelector('.location');
  const conditionsDisplay = () => document.querySelector('.conditions');
  const currentTempDisplay = () => document.querySelector('.currentTemp');
  const feelsLikeDisplay = () => document.querySelector('.feelsLike');
  const windSpeedDisplay = () => document.querySelector('.windSpeed');
  const humidityDisplay = () => document.querySelector('.humidity');

  return {
    mySearch,
    searchBtn,
    locationDisplay,
    conditionsDisplay,
    currentTempDisplay,
    feelsLikeDisplay,
    windSpeedDisplay,
    humidityDisplay,
  };
}
