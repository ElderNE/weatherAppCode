import '../../css/components/dayWeather.css'

export default function DayWeather(props) {

    //change color for lines, classes: dayWeatherLine__color1, dayWeatherLine__color-1
    let colorLine=-1;
    
    //add list
    let list = [];
    
    if (props?.weatherList && Array.isArray(props.weatherList.list))
        for (let i = 0; i < props.weatherList.list.length ; i++){
            //build list only for 12.00 and 00.00 times
            if ((props.weatherList.list[i].dt_txt.slice(11,13) === "00") 
                || (props.weatherList.list[i].dt_txt.slice(11,13) === "12")) {
                    
                    //change color for list line
                    colorLine=colorLine*(-1);

                    //rotate img for winter deg
                    let styleArray={color: "#FE7800"};
                    if(props?.weatherList?.list[i]?.wind?.deg){
                        styleArray = Object.assign(styleArray, {
                            transform: `rotate(${props.weatherList.list[i].wind.deg-90}deg)`
                        });
                    }

                    //build list
                    list.push(
                        <div key={i} className={"dayWeatherLine noSelection dayWeatherLine__color"+colorLine}>
                            <div className="dayWeatherLine_date font__color noSelection">{props.weatherList.list[i].dt_txt.slice(8,16)}</div>
                            <p className="dayWeatherLine-temp font__color noSelection">{Math.round(props.weatherList.list[i].main.temp*10-2730)/10}C&deg;</p>
                            <p className="dayWeatherLine-wind font__color noSelection">{Math.round(props.weatherList.list[i].wind.speed)}m/s</p>
                            <div className="dayWeatherLine-windDeg noSelection" style={styleArray}>&#10148;</div>
                            <img className="dayWeatherLine-img noSelection" src={`https://openweathermap.org/img/wn/${props.weatherList.list[i].weather[0]['icon']}@2x.png`} alt="wather list" height={30} widht={30}></img>
                        </div>
                    )
            }
        }
    return (
        <div className="dayWeather__margin">
            <div className="dayWeatherLine noSelection dayWeatherLine__color-1">
                <div className="dayWeatherLine_date font__color noSelection">date</div>
                <p className="dayWeatherLine-temp font__color noSelection">temp</p>
                <p className="dayWeatherLine-wind font__color noSelection">wind</p>
                <div className="dayWeatherLine-weather font__color noSelection">weather</div>
            </div>
            {list}
        </div>
    );
}