import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const apiKey = '492877429bc4d1188b721cd40fe5b48c';

  const [currentCity, setCurrentCity] = useState('');
  const [currentTemperature, setCurrentTemperature] = useState('');
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState('');

  const handleCityChange = useCallback(
    (city) => {
      console.log('city', city);
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
      console.log(data);
      console.log('city',data.name);
      console.log('temp',data.main.temp);
      console.log('icon',data.weather[0].icon);
      setCurrentCity(data.name);
      setCurrentTemperature(data.main.temp);
      setCurrentWeatherIcon(data.weather[0].icon);
   });
    },
    []
  );

  return (
    <section>
      <PickCity searching={handleCityChange} />
      <WeatherSummary
        city={currentCity}
        temp={currentTemperature}
        icon={currentWeatherIcon}
      />
      <Loader />
    </section>
  )
};

export default WeatherBox;