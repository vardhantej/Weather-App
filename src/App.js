import React, { useState } from 'react';
import './App.css';
const api={
  key: "0f3c75efde3a1829e8d404413ad9991c",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery]=useState('');
  const [weather, setWeather]=useState({});
 

  const search=(evt)=>{
    if(evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then((response)=>response.json()).then((result)=>{setWeather(result); setQuery(''); console.log(weather)});
      
    }
  }


  const dateBuilder=(d)=>{
    let months=["January","February","March","April","May","June",
    "July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let date=d.getDate();
    let day=days[d.getDay()];
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

  }

  const selectBG=()=>{
    if(typeof weather.main!="undefined"){
      return (weather.main.temp>25)?'App warm':'App';
    }
    return 'App';
  }

  return (
    <div className={selectBG()} >
      
      <main>
      
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Enter Location" onChange={(e)=> setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>

        <div className="weatherAppTitle">Weather App</div>

        {(typeof weather.main !="undefined")? (
        <div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>

        

        <div className="weather-box">
          
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>
        ):('')}
      </main>
    </div>
  );
}

export default App;
