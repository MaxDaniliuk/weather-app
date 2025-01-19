export default async function getWeatherData(city, temperatureScale) {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${temperatureScale}&key=Z9535Z8PBZBPCXVNRXLXEMPHA&`;
    const response = await fetch(url, { mode: 'cors' });

    if (!response.ok) {
      if (response.status === 404) throw new Error('404, Not found');
      if (response.status === 500)
        throw new Error('500, internal server error');
      throw new Error(response.status);
    }
    console.log('Promise resolved and HTTP status is successful');

    const weatherData = await response.json();
    const today = weatherData.days[0];
    if (!today) throw new Error('No data found');
    const weatherDetails = {
      location: weatherData.resolvedAddress,
      conditions: today.conditions,
      currentTemp: today.temp,
      feelsLike: today.feelslike,
      windSpeed: today.windspeed,
      humidity: today.humidity,
    };
    return weatherDetails;
  } catch (error) {
    console.error('Fetch', error);
    return error.message;
  }
}
