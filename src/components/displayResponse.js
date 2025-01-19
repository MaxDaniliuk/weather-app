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
      cachedElements.currentTempDisplay().textContent = `${currentTemp}`;
      [...cachedElements.currentTempScale()][0].textContent = `°${degree}`;
      cachedElements.feelsLikeText().textContent = 'Feels like:';
      cachedElements.feelsLikeDisplay().textContent = `${feelsLike}`;
      [...cachedElements.currentTempScale()][1].textContent = `°${degree}`;
      cachedElements.windSpeedText().textContent = 'Wind speed:';
      cachedElements.windSpeedDisplay().textContent = `${windSpeed} ${rate}`;
      cachedElements.humidityText().textContent = 'Humidity:';
      cachedElements.humidityDisplay().textContent = `${humidity}%`;
    }
  }
}

function cacheElements() {
  const mySearch = () => document.querySelector('#city-search');
  const searchBtn = () => document.querySelector('.svg-container');
  const locationDisplay = () => document.querySelector('.location');
  const conditionsDisplay = () => document.querySelector('.conditions');
  const currentTempDisplay = () => document.querySelector('.current-temp-data');
  const currentTempScale = () =>
    document.querySelectorAll('.current-temp-scale');
  const feelsLikeDisplay = () => document.querySelector('.feels-like-data');
  const feelsLikeText = () => document.querySelector('.feels-like > span');
  const windSpeedDisplay = () => document.querySelector('.wind-speed-data');
  const windSpeedText = () => document.querySelector('.wind-speed > span');
  const humidityDisplay = () => document.querySelector('.humidity-data');
  const humidityText = () => document.querySelector('.humidity > span');
  const selectedTempScale = () => document.querySelector('.selected');
  const getCelsius = () => document.querySelector('.metric');
  const getFahrenheit = () => document.querySelector('.us');

  return {
    mySearch,
    searchBtn,
    locationDisplay,
    conditionsDisplay,
    currentTempDisplay,
    currentTempScale,
    feelsLikeDisplay,
    feelsLikeText,
    windSpeedDisplay,
    windSpeedText,
    humidityDisplay,
    humidityText,
    selectedTempScale,
    getCelsius,
    getFahrenheit,
  };
}

function getTemperatureScale() {
  const tempScale =
    cacheElements().selectedTempScale()?.classList[0] ?? 'metric';
  return {
    tempScale,
    degree: tempScale === 'us' ? 'F' : 'C',
    rate: tempScale === 'us' ? 'mph' : 'kph',
  };
}

function selectTemperatureScale(e) {
  if (!e.target.classList.contains('selected')) {
    cacheElements().getCelsius().classList.remove('selected');
    cacheElements().getFahrenheit().classList.remove('selected');
    e.target.classList.add('selected');
  }
  e.stopPropagation();
}
