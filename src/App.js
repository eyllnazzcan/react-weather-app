import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import { Loader } from 'semantic-ui-react';

const URL = `https://api.openweathermap.org/data/2.5/forecast`
const API_KEY = `b29ee21e819094cdee2ed388f00621a7`

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState('');
  const [temprature, setTemprature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [icon, setIcon] = useState('');
  const [forcast, setForecast] = useState([]);
  const [loading, setloading] = useState(true);

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    axios.get(`${URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
      .then((weatherData) => {
        console.log(weatherData)
        setloading(false)
        setTemprature(weatherData.data.list[0].main.temp);
        setSunset(weatherData.data.city.sunset) 
        setSunrise(weatherData.data.city.sunrise)
        setHumidity(weatherData.data.list[0].main.humidity)
        setCity(weatherData.data.city.name)
        setIcon(weatherData.data.list[0].weather[0].main)
        setForecast(weatherData.data.list)
        //console.log(weatherData.data.list)
      })

     

  }, [latitude, longitude])

  return (
    <div className="main">
      <Header />
      {loading ? (
        <div>
          <p>Loading...Please Wait</p>
          <Loader active inline='centered' />
        </div>
      ) : (
        <WeatherCard
          temprature={temprature}
          humidity={humidity}
          sunrise={sunrise}
          sunset={sunset}
          city={city}
          icon={icon}
        />
      )}
      <Forecast forcast={forcast} />
    </div>
  );
}

export default App;
