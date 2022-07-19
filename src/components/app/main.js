import '../../css/components/main.css'
export default function Header( props ) {
    //we get only current time and needs timezone. change the time for the place.
    let time = Date.now();
    let timezone = new Date().getTimezoneOffset();
    let timeInPlace = new Date(time+props.weather.timezone*1000+timezone*60000).toLocaleString();
    
    //rotate img for winter deg
    let styleArray={color: "#FE7800"};
    if(props?.weather?.wind?.deg){
        styleArray = Object.assign(styleArray, {
            transform: `rotate(${props.weather.wind.deg-90}deg)`
        });
    }
    else {
        styleArray = Object.assign(styleArray, {
            transform: `rotate(${0}deg)`
        });
    }
    
    return (
        <main>
            { props.weather?.resault && <p>Sorry. Try again</p>}
            { !props.weather?.resault && props.weather.name &&
            <>
                <div className="main-title">
                    <h1 className="font__color noSelection">Weather</h1>
                    <div className="weather__icon">
                            <img className="noSelection" src={`https://openweathermap.org/img/wn/${props.weather.weather[0]['icon']}@2x.png`} alt="wather"></img>
                    </div>
                </div>
                <div className="main-place">
                    <div className="main-about">
                        <h3 className="weather-city place-about__p font__color noSelection">Place: {props.weather.name}, {props.weather.sys.country}</h3>
                        <p className="weather-time place-about__p font__color noSelection">{timeInPlace}</p>
                        <p className="weather-latitude place-about__p font__color noSelection">latitude: {Math.round(props.weather.coord.lat*100)/100}&deg;</p>
                        <p className="weather-longitude place-about__p font__color noSelection">longitude: {Math.round(props.weather.coord.lon*100)/100}&deg;</p>
                    </div>
                    <div className="main-weather">
                        <div className="weather-wind">
                            <p className="weather-windspeed place-weather__p font__color noSelection">{props.weather.wind.speed} m/s</p>
                            <div className="place-arrowRotate noSelection" style={styleArray}>&#10148;</div>
                        </div>
                        <p className="weather-temperature place-weather__p font__color noSelection">{Math.round(props.weather.main.temp*10 - 2730)/10} C&deg;</p>
                        <p className="weather-feelsLike place-weather__p font__color noSelection">Feels like {Math.round(props.weather.main.feels_like*10 - 2730)/10} C&deg;</p>
                        <p className="weather-pressure place-weather__p font__color noSelection">{props.weather.main.pressure} hPa</p>
                        
                    </div>
                </div>
            </>
            }
        </main>
    );
}
