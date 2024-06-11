import React, { useState } from 'react';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import styles from './PickCity.module.scss';

const PickCity = ({ searching }) => {
  const [city, setCity] = useState('');

  const searchingCity = (e) => {
    e.preventDefault();
    searching(city);
    setCity('');
  };

  return (
    <form className={styles.pickCityForm} onSubmit={searchingCity}>
      <label>
        <TextInput
          placeholder="Enter city name...."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <Button onClick={searchingCity}>
        Search
      </Button>
    </form>
  );
};

export default PickCity;
