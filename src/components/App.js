import '../css/App.css';
import Header from './app/header';
import Main from './app/main';
import Canvas from './app/canvas';
import Footer from './app/footer';
import { useState, useEffect } from 'react';
import { usePosition } from './hooks/usePosition';

function App() {
  const [ city , setCity ] = useState("");
  const [ weather, setWeather ] = useState({});
  const [ weatherList, setWeatherList] = useState({});
  const [ isCoord, setIsCoord ] = useState(true);

  let coordinates = usePosition();

  let textFromCityInput="";
  const apiKey="52eebb6522e309e7c6ce64afb1d3c97c";

  function setCityRequest (e) {
    setCity(textFromCityInput);
    textFromCityInput="";
    e.preventDefault();
    e.target.reset();
  }

  useEffect(() => {
    if(city){
      try{
        (async function weatherResault() {
          const requestWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
          const weatherResponse = await requestWeather.json();
          if(requestWeather.ok) {
            setWeather(weatherResponse);
          }  
          else {
            setWeather({resault: true});
          }  
        })();
        (async function weatherListResault() {
          const requestWeatherList = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
          const weatherResponseList = await requestWeatherList.json();
          if(requestWeatherList.ok) {
            setWeatherList(weatherResponseList);
          }  
          else {
            setWeatherList({resault: true});
          }  
        })();
      }
      catch(err) {
        console.log(err);
      }
      
      setCity("");
    }
    else {
      if (isCoord && coordinates?.latitude && coordinates?.longitude){
        try{
          (async function weatherResault() {
            const requestWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}`);
            const weatherResponse = await requestWeather.json();
            if(requestWeather.ok) {
              setWeather(weatherResponse);
            }  
            else {
              setWeather({resault: true});
            }  
          })();
          (async function weatherListResault() {
            const requestWeatherList = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}`);
            const weatherResponseList = await requestWeatherList.json();
            if(requestWeatherList.ok) {
              setWeatherList(weatherResponseList);
            }  
            else {
              setWeatherList({resault: true});
            }  
          })();
          setIsCoord(false);
        }
        catch(err) {
          console.log(err);
        }
      }
    }
  },[city, coordinates, isCoord]);
 
  return (
    <>
      <Header />
      <form onSubmit={e=>setCityRequest(e)} className="app-form">
        <input type="text" label="city" onChange={e=>textFromCityInput=e.target.value} placeholder="Wheather in your city" maxLength={100} className="app-inputSearch"/>
        <button type="submit" className="app-buttonSearch">Search</button>
      </form>
      <div className="chartAndTable">
        <Main weather={weather}/>
        { !weather.resault && weather.name && <Canvas weatherList={weatherList}/>}
      </div>
      <Footer />
    </>
  );
}

export default App;
