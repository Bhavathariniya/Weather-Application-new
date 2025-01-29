import "./Header.css";
import React, { useRef, useState } from 'react';
import fav_icon from '../../assets/fav_icon.png';
import 'bootstrap/dist/css/bootstrap.min.css';
const Header = ({ handleSearch, handleFav }) => {

  const inputRef = useRef();
  const [val, setval] = useState("");
  const onSearchClick = () => {
    const searchValue = inputRef.current.value;
    setval(searchValue) // Get the input value
    inputRef.current.value = "";
    handleSearch(searchValue);  // Pass it to the parent or another component
  };

  const onFavClick = () => {
    handleFav(val); // Pass both when the notification icon is clicked
     // Get the input value
  };

  const [currLoc, setCurrLoc] = useState("");
  function findCurrAdd() {
    
    const success = (position) => {

      console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude + " " + longitude);

      const geoApiUrl = `https://api-bdc.io/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

      fetch(geoApiUrl)
      .then(res => res.json())
      .then(data =>{
        console.log(data)
        const locality = data.locality || "Unknown location";
        console.log(locality);
        setCurrLoc(locality);
      })

      setval(currLoc);
      handleSearch(currLoc);

    };

    const error = () => {
      alert("unable to retrive your location");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }

  return (
    <section className="header-section">
      <div>
      <button type="button" class="btn btn-light" onClick={findCurrAdd}>Current Location</button>
      </div>
      <div>
        <ion-icon name="search-outline" onClick={onSearchClick}></ion-icon>
        <input type="text" placeholder="Search here" ref={inputRef}/>
      </div>
      <div>
        <ion-icon name="calendar-outline"></ion-icon>
        {/* <ion-icon name="notifications-outline" onClick={onFavClick}></ion-icon> */}
        <ion-icon name="heart" onClick={onFavClick}></ion-icon>
      </div>
    </section>
  );
};

export default Header;


