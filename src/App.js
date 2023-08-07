import React , {useState, useEffect} from "react";
import axios from 'axios';
function App() {
  const [data,setData] = useState({});
  const [location, setLocation] = useState('');
  const apiKey=`8ca7dc668d179fce618c2976ecd7e282`;
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          localStorage.setItem('weatherData', JSON.stringify(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });

      setLocation('');
    }
  };
  useEffect(() => {
    const storedData = localStorage.getItem('weatherData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);
  return (
    <div className="app">
      <div className="container">
      <div className="search">
        <input value={location} onChange={event=>setLocation(event.target.value)}
        placeholder="Enter city" onKeyDown={searchLocation}></input>
      </div>
        <div className="top">
          <div className="location">
              <p>{data.name}</p>
          </div>
          <div className="temp">
           {data.main ? <h1>{data.main.temp}ºC</h1> : null}
          </div>
          <div className="desc">
          {/* {data.weather ? <p>{data.weather[0].main}</p> : null} */}
          {data.weather ? <p>{data.weather[0].description}</p> : null}
          {/* <img src={data.weather.icon}></img> */}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p>Feels like</p>
            {data.main ? <p>{data.main.feels_like}</p> : null}
          </div>
          <div className="humidity">
            <p>humidity</p>
            {data.main ?  <p>{data.main.humidity}%</p> : null}
          </div>
          <div className="wind">
            <p>Wind</p>
            {data.wind ? <p>{data.wind.speed}m/s</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;