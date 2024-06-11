import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {

  const apiKey = '492877429bc4d1188b721cd40fe5b48c';

  const [currentCity, setCurrentCity] = useState('');
  const [currentTemperature, setCurrentTemperature] = useState('');
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState('');
  const [showWeather, setShowWeather] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCityChange = useCallback(
    (city) => {
      setError('');
      setShowWeather(false);
      setLoading(true);
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        
      .then ( res => {
          if (res.status === 404) {
            setError('city not found');
            setLoading(false);
            return;
          } else {
            return res.json()
            .then(data => {
              setCurrentCity(data.name);
              setCurrentTemperature(data.main.temp);
              setCurrentWeatherIcon(data.weather[0].icon);
              setShowWeather(true);
              setLoading(false);
            });
          }
      })
    }

    ,[]
  );

  return (
    <section>
      <PickCity searching={handleCityChange} />
      { showWeather && currentCity &&
        <WeatherSummary
          city={currentCity}
          temp={currentTemperature}
          icon={currentWeatherIcon}
        />
      }
      {
        loading &&
        <Loader />
      }
      {
        error &&
        <ErrorBox>{error}</ErrorBox>
      }
    </section>
  )
};

export default WeatherBox;