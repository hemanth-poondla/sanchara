// WeatherDisplay.jsx
import React from 'react';

const WeatherDisplay = ({ temperatures }) => {
  return (
    <div className="weatherContainer">
      {temperatures.map((temp, index) => (
        <div key={index} className="temperature">
          {temp}°F
        </div>
      ))}
    </div>
  );
};

export default WeatherDisplay;