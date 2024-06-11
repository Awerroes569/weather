import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';

const WeatherBox = props => {

  const apiKey = '492877429bc4d1188b721cd40fe5b48c';

  const handleCityChange = useCallback(
    (city) => {
      console.log('city', city);
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
     console.log(data);
   });
    },
    []
  );

  return (
    <section>
      <PickCity searching={handleCityChange} />
      <WeatherSummary />
      <Loader />
    </section>
  )
};

export default WeatherBox;