import { useEffect, useState } from "react";

//cheking your position
export const usePosition = () => {
    const [ coordinates, setCoordinates ]= useState();
    useEffect(()=>{

        const fetchCoordinates = async () => {
            try {
                const { coords } = await new Promise((success, error) => {
                    navigator.geolocation.getCurrentPosition(success, error);
                });
                let { latitude, longitude } = coords;
                setCoordinates ({ latitude, longitude });
            } catch (error) {
                const latitude = 0;
                const longitude = 0;
                setCoordinates ({ latitude, longitude });
            }

        };
        fetchCoordinates();
    },[]);

    return coordinates;
}