import getWeatherData from './getWeatherData';

export default function displayResponse() {
  cacheElements().searchBtn().addEventListener('click', processResponse);
  cacheElements()
    .mySearch()
    .addEventListener('keypress', e => {
      if (e.key === 'Enter') processResponse();
    });
  cacheElements()
    .getCelsius()
    .addEventListener('click', e => selectTemperatureScale(e));
  cacheElements()
    .getFahrenheit()
    .addEventListener('click', e => selectTemperatureScale(e));
}

async function processResponse() {
  const cachedElements = cacheElements();
  const inputEntered = cachedElements.mySearch().value;
  if (inputEntered.trim() !== '') {
    const { tempScale, degree, rate } = getTemperatureScale();
    const response = await getWeatherData(inputEntered, tempScale); // second param
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
      cachedElements.currentTempDisplay().textContent = `${currentTemp} °${degree}`;
      cachedElements.feelsLikeDisplay().textContent = `${feelsLike} °${degree}`;
      cachedElements.windSpeedDisplay().textContent = `${windSpeed} ${rate}`;
      cachedElements.humidityDisplay().textContent = `${humidity}%`;
    }
  }
}

function cacheElements() {
  const mySearch = () => document.querySelector('#city-search');
  const searchBtn = () => document.querySelector('.svg-container');
  const locationDisplay = () => document.querySelector('.location');
  const conditionsDisplay = () => document.querySelector('.conditions');
  const currentTempDisplay = () => document.querySelector('.current-temp');
  const feelsLikeDisplay = () => document.querySelector('.feels-like-data');
  const windSpeedDisplay = () => document.querySelector('.wind-speed-data');
  const humidityDisplay = () => document.querySelector('.humidity-data');
  const selectedTempScale = () => document.querySelector('.selected');
  const getCelsius = () => document.querySelector('.metric');
  const getFahrenheit = () => document.querySelector('.us');

  return {
    mySearch,
    searchBtn,
    locationDisplay,
    conditionsDisplay,
    currentTempDisplay,
    feelsLikeDisplay,
    windSpeedDisplay,
    humidityDisplay,
    selectedTempScale,
    getCelsius,
    getFahrenheit,
  };
}

function getTemperatureScale() {
  try {
    const tempScale = cacheElements().selectedTempScale().classList[0];
    let degree = 'C';
    let rate = 'kph';
    if (tempScale === 'us') {
      degree = 'F';
      rate = 'mph';
    }
    return { tempScale: tempScale, degree: degree, rate: rate };
  } catch (e) {
    return { tempScale: 'metric', degree: 'C', rate: 'kph' };
  }
}

function selectTemperatureScale(e) {
  if (!e.target.classList.contains('selected')) {
    cacheElements().getCelsius().classList.remove('selected');
    cacheElements().getFahrenheit().classList.remove('selected');
    e.target.classList.add('selected');
  }
  e.stopPropagation();
}
