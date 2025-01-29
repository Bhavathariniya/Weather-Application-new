import React from "react";
import "./Dashboard.css";
import { useEffect, useState, useRef, useContext } from 'react';
import Header from "../Header/Header";
import sunCloudy from "../../assets/sun-cloudy.png";
import Rain from "../../assets/rain.png";
import PartlySunny from "../../assets/partly-sunny.png";
import SunWindy from "../../assets/sun-windy.png";
import Compass from "../../assets/compass.png";
import Drops from "../../assets/drops.png";
import Ultraviolet from "../../assets/ultraviolet.png";

import search_icon from '../../assets/Search.png';
import clear_icon from '../../assets/clear.png';
import cloud_icon from '../../assets/cloud.png';
import drizzle_icon from '../../assets/drizzle.png';
import rain_icon from '../../assets/rain.png';
import snow_icon from '../../assets/snow.png';
import wind_icon from '../../assets/wind2.png';
import humidity_icon from '../../assets/humidity.png';

import visibility from '../../assets/visibility2.png';
import pressure from '../../assets/pressure.png'


const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [sunriseTime, setsunriseTime] =useState();
  const [sunsetTime, setsunsetTime] =useState();
  //const [weatherData_hourly, setWeatherData_hourly] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": snow_icon,
    "10n": snow_icon
  };

    const [currLoc, setCurrLoc] = useState("");

    const fetchCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api-bdc.io/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
            .then((res) => res.json())
            .then((data) => {
              const locality = data.locality || "Unknown location";
              setCurrLoc(locality);
              handleSearch(locality); // Search weather for current location
            })
            .catch((err) => console.error("Error fetching location:", err));
        },
        () => alert("Unable to retrieve your location")
      );
    };
    

      //calling fn before search
      useEffect(() => {
        fetchCurrentLocation();
      }, []);


  const handleSearch = async (searchValue) => {

    console.log(searchValue)

    // if (searchValue === "") {
    //   alert("Enter city name!");
    //   return;
    // }

    try{

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
          alert(data.message);
          return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
          //icon : `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          description:data.weather[0].description,
          lat: data.coord.lat,
          lon: data.coord.lon,
          feels_like: data.main.feels_like,
          cloud_coverage : data.clouds.all,
          visibility : data.visibility,
          pressure: data.main.pressure,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          timezone: data.timezone,
          temp_max : data.main.temp_max,
          temp_min : data.main.temp_min
      });
      // // Assuming weatherData is already populated
      // let sunriseTimestamp = weatherData.sunrise;  // UNIX timestamp for sunrise
      // let sunsetTimestamp = weatherData.sunset;    // UNIX timestamp for sunset
      // let timezoneOffset = weatherData.timezone;   // Timezone offset in seconds (e.g., +5:30)

      // console.log(sunriseTimestamp);
      // console.log(sunsetTimestamp);
      // console.log(timezoneOffset);

      // let sunriseDate = new Date((sunriseTimestamp + timezoneOffset) * 1000); // Adjust for offset
      // let sunriseTime = sunriseDate.toUTCString(); // Convert to a UTC string

      // setsunriseTime(sunriseTime);

      // // Convert sunset to local time
      // let sunsetDate = new Date((sunsetTimestamp + timezoneOffset) * 1000); // Adjust for offset
      // let sunsetTime = sunsetDate.toUTCString(); // Convert to a UTC string
      // console.log(`Raw Sunset UTC: ${sunsetTime}`); // Debugging

      // setsunsetTime(sunsetTime);

      // console.log(`Raw Sunrise UTC: ${sunriseDate.toUTCString()}`);
      // console.log(`Raw Sunset UTC: ${sunsetDate.toUTCString()}`);

      // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

      
      // Convert sunrise to local time
      let sunriseTimestamp = await weatherData.sunrise * 1000;  // Convert to milliseconds
      let sunsetTimestamp = await weatherData.sunset * 1000;    // Convert to milliseconds

      // Convert to local time using the provided timezone
      let sunriseDate = new Date(sunriseTimestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata', // Explicitly set the timezone
      });
      console.log(`Formatted Sunrise Time: ${sunriseDate}`);
      setsunriseTime(sunriseDate);

      let sunsetDate = new Date(sunsetTimestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata', // Explicitly set the timezone
      });
      console.log(`Formatted Sunset Time: ${sunsetDate}`);
      setsunsetTime(sunsetDate)



      // const lat = weatherData.lat;
      // const lon = weatherData.lon;

      // const url_hourly = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      // const response_hourly = await fetch(url_hourly);
      // const data_hourly = await response_hourly.json();

      // if (!response_hourly.ok) {
      //   alert(data_hourly.message);
      //   return;
      // }

      // console.log(data_hourly);

      // setWeatherData_hourly({
      //   icon: `https://openweathermap.org/img/wn/${weatherData_hourly.list[1].weather[0].icon}@2x.png`,
      //   temp: weatherData_hourly.list[0].main.temp,
      //   description: weatherData_hourly.list[1].weather[0].main

      // });


    } catch(error) {
      console.log(error)
      setWeatherData(false);
      console.error("Error in fetching weather data");

    }


  };

  //let fav_city = document.getElementsByClassName("fav_city");
  let allcity = document.getElementsByClassName("all-cities")[0];

  const handleFav = async (searchValue) => {
    console.log("weather data inside fav fn", weatherData);
    console.log("Notification clicked with search value:", searchValue);
    // Perform actions with the search value and other logic
     let fav_city = document.createElement("div")
     let icon_info = document.createElement("div")
     let img = document.createElement("img")
     let data_div = document.createElement("div")
     let span1 = document.createElement("span")
     let span2 = document.createElement("span")
     let temp_div = document.createElement("div")
     let span3 = document.createElement("span")
     let removeBtn = document.createElement("button");

     img.src = weatherData.icon
     span1.innerHTML = `${weatherData.location}`
     span2.innerHTML = `${weatherData.description}. Humidity:${weatherData.humidity}`
     span3.innerHTML = `${weatherData.temperature}°`
     span3.style.fontSize = "20px"
     removeBtn.innerHTML = "❌";

     Object.assign(removeBtn.style, {
      background: "white",
      color: "white",
      padding: "5px",
      border: "none",
      cursor: "pointer",
      borderRadius: "7px",
      fontSize: "14px",
      marginLeft: "10px"
  });

     allcity.appendChild(fav_city)
     fav_city.appendChild(icon_info)
     icon_info.appendChild(img)
     icon_info.appendChild(data_div)
     data_div.appendChild(span1)
     data_div.appendChild(span2)
     fav_city.appendChild(temp_div)
     temp_div.appendChild(span3)
     fav_city.appendChild(removeBtn);

     removeBtn.addEventListener("click", () => {
      fav_city.remove();
    });

  };




  return (
    <>
    <Header handleSearch={handleSearch} handleFav={handleFav} />
    <section className="dashboard-section">
      <div className="home">
        <div className="feed-1">
          <div className="feeds">
            <img src={weatherData.icon} alt="" />
            <div>
              <div>
                <span>{weatherData.location}</span>
                <span>{weatherData.description}</span>
              </div>
              <div>
                <span>
                {weatherData.temperature}<sup>o</sup>
                </span>
              </div>
            </div>
          </div>
          <div className="feed">
            <div>
              <div>
                <img src={PartlySunny} alt="" />
                {/* <span style={{ fontSize: '25px', marginLeft: '14px'}}>
                  {sunriseTime}
                </span> */}
              </div>
              <div>
              <span style={{ fontSize: '25px', marginLeft: '14px'}}>
                  {sunriseTime}
                </span>
                <span>Sunset</span>
              </div>
            </div>
            <div>
              <div>
                <img src={SunWindy} alt="" />
                {/* <span style={{ fontSize: '25px', marginLeft: '14px'}}>
                  {sunsetTime} 
                </span> */}
              </div>
              <div>
              <span style={{ fontSize: '25px', marginLeft: '14px'}}>
                  {sunsetTime} 
              </span>
                <span>Sunrise</span>
              </div>
            </div>
          </div>
        </div>
        <div className="highlights">
          <h2>Today's Highlights</h2>
          <div className="all-highlights">
            <div>
              <div>
                <img src={Compass} alt="" />
                <div>
                  <span>Feel Like</span>
                  <span>Normal</span>
                </div>
              </div>
              <div>
                <span>
                {weatherData.feels_like}<sup>o</sup>
                </span>
              </div>
            </div>
            <div>
              <div>
                <img src={sunCloudy} alt="" />
                <div>
                  <span>Cloud Coverage</span>
                  <span>{weatherData.description}</span>
                </div>
              </div>
              <div>
                <span>
                  {weatherData.cloud_coverage}<sup>%</sup>
                </span>
              </div>
            </div>
            <div>
              <div>
                <img src={visibility} alt="" />
                <div>
                  <span>Visibility</span>
                  <span>Normal</span>
                </div>
              </div>
              <div>
                <span>
                  {(weatherData.visibility)/1000}<sup>km</sup>
                </span>
              </div>
            </div>
            <div>
              <div>
                <img src={Drops} alt="" />
                <div>
                  <span>Humidity</span>
                  <span>Heavy</span>
                </div>
              </div>
              <div>
                <span>
                {weatherData.humidity}<sup>o</sup>
                </span>
              </div>
            </div>
            <div>
              <div>
                <img src={wind_icon} alt="" />
                <div>
                  <span>Wind</span>
                  <span>Heavy</span>
                </div>
              </div>
              <div>
                <span>
                {weatherData.windSpeed}<sup>km/h</sup>
                </span>
              </div>
            </div>
            <div>
              <div>
                <img src={pressure} alt="" />
                <div>
                  <span>Pressure</span>
                  <span>Normal</span>
                </div>
              </div>
              <div>
                <span>
                  {weatherData.pressure} <sup>hPa</sup>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cities">
        <h2>Other Cities</h2>
        <div className="all-cities">
          {/* <div className="fav_city">
            <div className="icon_info">
              <img src={weatherData.icon} alt="" />
              <div>
                <span>{weatherData.location}</span>
                <span>{weatherData.cloud_coverage}. High: 11° Low: 18°</span>
              </div>
            </div>
            <div>
              <span>
                7 <sup>o</sup>
              </span>
            </div>
          </div> */}
          {/* <button>
            <span>See More</span>
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button> */}
        </div>
      </div>
    </section>
    </>

  );

}
export default Dashboard;










/*
import React from "react";
import "./Dashboard.css";
import { useEffect, useState, useRef, useContext } from 'react';
import Header from "../Header/Header";
import sunCloudy from "../../assets/sun-cloudy.png";
import Rain from "../../assets/rain.png";
import PartlySunny from "../../assets/partly-sunny.png";
import SunWindy from "../../assets/sun-windy.png";
import Compass from "../../assets/compass.png";
import Drops from "../../assets/drops.png";
import Ultraviolet from "../../assets/ultraviolet.png";

import search_icon from '../../assets/Search.png';
import clear_icon from '../../assets/clear.png';
import cloud_icon from '../../assets/cloud.png';
import drizzle_icon from '../../assets/drizzle.png';
import rain_icon from '../../assets/rain.png';
import snow_icon from '../../assets/snow.png';
import wind_icon from '../../assets/wind2.png';
import humidity_icon from '../../assets/humidity.png';

import visibility from '../../assets/visibility2.png';
import pressure from '../../assets/pressure.png'


const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [sunriseTime, setsunriseTime] =useState();
  const [sunsetTime, setsunsetTime] =useState();
  //const [weatherData_hourly, setWeatherData_hourly] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": snow_icon,
    "10n": snow_icon
  };
  const handleSearch = async (searchValue) => {

    console.log(searchValue)

    if (searchValue === "") {
      alert("Enter city name!");
      return;
    }

    try{

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
          alert(data.message);
          return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
          //icon : `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          description:data.weather[0].description,
          lat: data.coord.lat,
          lon: data.coord.lon,
          feels_like: data.main.feels_like,
          cloud_coverage : data.clouds.all,
          visibility : data.visibility,
          pressure: data.main.pressure,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          timezone: data.timezone
      });
      // // Assuming weatherData is already populated
      // let sunriseTimestamp = weatherData.sunrise;  // UNIX timestamp for sunrise
      // let sunsetTimestamp = weatherData.sunset;    // UNIX timestamp for sunset
      // let timezoneOffset = weatherData.timezone;   // Timezone offset in seconds (e.g., +5:30)

      // console.log(sunriseTimestamp);
      // console.log(sunsetTimestamp);
      // console.log(timezoneOffset);

      // let sunriseDate = new Date((sunriseTimestamp + timezoneOffset) * 1000); // Adjust for offset
      // let sunriseTime = sunriseDate.toUTCString(); // Convert to a UTC string

      // setsunriseTime(sunriseTime);

      // // Convert sunset to local time
      // let sunsetDate = new Date((sunsetTimestamp + timezoneOffset) * 1000); // Adjust for offset
      // let sunsetTime = sunsetDate.toUTCString(); // Convert to a UTC string
      // console.log(`Raw Sunset UTC: ${sunsetTime}`); // Debugging

      // setsunsetTime(sunsetTime);

      // console.log(`Raw Sunrise UTC: ${sunriseDate.toUTCString()}`);
      // console.log(`Raw Sunset UTC: ${sunsetDate.toUTCString()}`);

      // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

      
      // Convert sunrise to local time
      let sunriseTimestamp = weatherData.sunrise * 1000;  // Convert to milliseconds
      let sunsetTimestamp = weatherData.sunset * 1000;    // Convert to milliseconds

      // Convert to local time using the provided timezone
      let sunriseDate = new Date(sunriseTimestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata', // Explicitly set the timezone
      });
      console.log(`Formatted Sunrise Time: ${sunriseDate}`);
      setsunriseTime(sunriseDate);

      let sunsetDate = new Date(sunsetTimestamp).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata', // Explicitly set the timezone
      });
      console.log(`Formatted Sunset Time: ${sunsetDate}`);
      setsunsetTime(sunsetDate)



      // const lat = weatherData.lat;
      // const lon = weatherData.lon;

      // const url_hourly = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      // const response_hourly = await fetch(url_hourly);
      // const data_hourly = await response_hourly.json();

      // if (!response_hourly.ok) {
      //   alert(data_hourly.message);
      //   return;
      // }

      // console.log(data_hourly);

      // setWeatherData_hourly({
      //   icon: `https://openweathermap.org/img/wn/${weatherData_hourly.list[1].weather[0].icon}@2x.png`,
      //   temp: weatherData_hourly.list[0].main.temp,
      //   description: weatherData_hourly.list[1].weather[0].main

      // });


    } catch(error) {
      console.log(error)
      setWeatherData(false);
      console.error("Error in fetching weather data");

    }


  };

  const handleFav = async (searchValue) => {
    console.log("Notification clicked with search value:", searchValue);
    // Perform actions with the search value and other logic
  };


  return (
    <>
    <Header handleSearch={handleSearch} handleFav={handleFav} />
    <section className="dashboard-section">
      <div className="home">
        <div className="feed-1">
          <div className="feeds">
            <img src={weatherData.icon} alt="" />
            <div>
              <div>
                <span>{weatherData.location}</span>
                <span>{weatherData.description}</span>
              </div>
              <div>
                <span>
                {weatherData.temperature}<sup>o</sup>
                </span>
              </div>
            </div>
          </div>
          <div className="feed">
            <div>
              <div>
                <img src={PartlySunny} alt="" />
                {/* <span style={{ fontSize: '25px', marginLeft: '14px'}}>
                  {sunriseTime}
                </span> */        /*      }                
                </div>
                <div>
                <span style={{ fontSize: '25px', marginLeft: '14px'}}>
                    {sunriseTime}
                  </span>
                  <span></span>
                </div>
              </div>
              <div>
                <div>
                  <img src={SunWindy} alt="" />
                  {/* <span style={{ fontSize: '25px', marginLeft: '14px'}}>
                    {sunsetTime} 
                  </span> */              /* }    
                </div>
                <div>
                <span style={{ fontSize: '25px', marginLeft: '14px'}}>
                    {sunsetTime} 
                </span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="highlights">
            <h2>Today's Highlights</h2>
            <div className="all-highlights">
              <div>
                <div>
                  <img src={Compass} alt="" />
                  <div>
                    <span>Feel Like</span>
                    <span>Normal</span>
                  </div>
                </div>
                <div>
                  <span>
                  {weatherData.feels_like}<sup>o</sup>
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <img src={sunCloudy} alt="" />
                  <div>
                    <span>Cloud Coverage</span>
                    <span>{weatherData.description}</span>
                  </div>
                </div>
                <div>
                  <span>
                    {weatherData.cloud_coverage}<sup>%</sup>
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <img src={visibility} alt="" />
                  <div>
                    <span>Visibility</span>
                    <span>Normal</span>
                  </div>
                </div>
                <div>
                  <span>
                    {(weatherData.visibility)/1000}<sup>km</sup>
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <img src={Drops} alt="" />
                  <div>
                    <span>Humidity</span>
                    <span>Heavy</span>
                  </div>
                </div>
                <div>
                  <span>
                  {weatherData.humidity}<sup>o</sup>
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <img src={wind_icon} alt="" />
                  <div>
                    <span>Wind</span>
                    <span>Heavy</span>
                  </div>
                </div>
                <div>
                  <span>
                  {weatherData.windSpeed}<sup>km/h</sup>
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <img src={pressure} alt="" />
                  <div>
                    <span>Pressure</span>
                    <span>Normal</span>
                  </div>
                </div>
                <div>
                  <span>
                    {weatherData.pressure} <sup>hPa</sup>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cities">
          <h2>Other Cities</h2>
          <div className="all-cities">
            <div>
              <div>
                <img src={sunCloudy} alt="" />
                <div>
                  <span>Manchester</span>
                  <span>Cloudy. High: 11° Low: 18°</span>
                </div>
              </div>
              <div>
                <span>
                  7 <sup>o</sup>
                </span>
              </div>
            </div>
            <div>
              <div>
                <img src={Rain} alt="" />
                <div>
                  <span>Edinburgh</span>
                  <span>Rain. High: 8° Low: 12°</span>
                </div>
              </div>
              <div>
                <span>
                  19 <sup>o</sup>
                </span>
              </div>
            </div>
            <div>
              <div>
                <img src={Rain} alt="" />
                <div>
                  <span>Bristol</span>
                  <span>Snow. High: 2° Low: 8°</span>
                </div>
              </div>
              <div>
                <span>
                  22 <sup>o</sup>
                </span>
              </div>
            </div>
            <div>
              <div>
                <img src={sunCloudy} alt="" />
                <div>
                  <span>York</span>
                  <span>Cloudy. High: 10° Low: 18°</span>
                </div>
              </div>
              <div>
                <span>
                  20 <sup>o</sup>
                </span>
              </div>
            </div>
            <button>
              <span>See More</span>
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </button>
          </div>
        </div>
      </section>
      </>
  
    );
  };
  
  export default Dashboard;
  
*/