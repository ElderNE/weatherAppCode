import '../../css/components/canvas.css'
import React, { useRef, useEffect } from 'react';

const Canvas =(props) => {

    let sizeWidth;
    let sizeHeight;
    if(window.innerWidth > 640) {
        sizeWidth=600;
        sizeHeight=300;
    }
    else {
        sizeWidth=300;
        sizeHeight=150;
    }
    
    let text ="";
    let weather=[];
    if(props?.weatherList && Array.isArray(props.weatherList.list)){
        for (let i = 0 ; i < props.weatherList.list.length ; i++){
            weather.push(Math.round(props.weatherList.list[i].main.temp*10-2730)/10);
            text +=props.weatherList.list[i].dt_txt.slice(11,13)+" ";
        }
    }

    const canvasRef = useRef(null);

    const draw = (ctx, sizeX, sizeY) => {
        let step=(sizeX-30)/weather.length;
        let sum=0;
        let plusTemperature = true;
        for(let i in weather) {
            if(weather[i] < 0)
                plusTemperature = false;
            if(Math.abs(sum) < Math.abs(weather[i]))
                sum = Math.abs(weather[i]);
        }           
        let k=0.9*sizeY/sum;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if(plusTemperature) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.moveTo(40, 20);
            ctx.lineTo(40, sizeY-20);
            ctx.lineTo(sizeX, sizeY-20);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#FE7800";
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineTo(43, sizeY-weather[0]*k);
            for (let i = 1; i < weather.length ; i++)
                ctx.lineTo(step*i+40, sizeY-weather[i]*k);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillText(text , 40, sizeY-2);
            ctx.stroke();
            ctx.beginPath();
            ctx.font="16px Space Grotesk";
            ctx.fillText(weather[0], 0, sizeY-weather[0]*k);
            ctx.fillText("0" , 0, sizeY-20);
        }
        else {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.moveTo(40, 20);
            ctx.lineTo(40, sizeY-20);
            ctx.moveTo(40, sizeY/2);
            ctx.lineTo(sizeX, sizeY/2);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#FE7800";
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineTo(43, sizeY/2-weather[0]*k/2-20);
            for (let i = 1; i < weather.length ; i++)
                ctx.lineTo(step*i+40, sizeY/2-weather[i]*k/2-20);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillText(text , 40, sizeY/2+22);
            ctx.stroke();
            ctx.beginPath();
            ctx.font="16px Space Grotesk";
            ctx.fillText(weather[0], 0, sizeY/2-weather[0]*k/2-20);
            ctx.fillText("0" , 0, sizeY/2);
        }    
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.style.height=sizeHeight+"px";
        canvas.style.width=sizeWidth+"px";
        let sizeY=sizeHeight*window.devicePixelRatio;
        let sizeX=sizeWidth*window.devicePixelRatio;
        canvas.width=sizeX;
        canvas.height=sizeY;
        

        let animationFrameId;
        const render = () => {
            draw(context, sizeX, sizeY);
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [weather[0]]);

    return (
        <div className="canvas-chart">
            <h4>3h time temperature chart</h4>
            <canvas className="canvas" ref={canvasRef} />
        </div>
    );    
}
export default Canvas