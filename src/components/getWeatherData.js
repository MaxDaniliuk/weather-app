export default async function getWeatherData(city, temperatureScale) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${temperatureScale}&key=Z9535Z8PBZBPCXVNRXLXEMPHA&`,
      { mode: 'cors' },
      // us - farenheit,
      // metric - celsius
    );

    if (response.ok) {
      console.log('Promise resolved and HTTP status is successful');
      const weatherData = await response.json();
      const weatherDetails = {
        location: weatherData.resolvedAddress,
        conditions: weatherData.days[0].conditions,
        currentTemp: weatherData.days[0].temp,
        feelsLike: weatherData.days[0].feelslike,
        windSpeed: weatherData.days[0].windspeed,
        humidity: `${weatherData.days[0].humidity}%`,
      };
      console.log(weatherDetails);
      return weatherDetails;
    } else {
      if (response.status === 404) throw new Error('404, Not found');
      if (response.status === 500)
        throw new Error('500, internal server error');
      // For any other server error
      throw new Error(response.status);
    }
  } catch (error) {
    console.error('Fetch', error);
    return error;
  }
}
