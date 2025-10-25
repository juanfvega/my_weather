import React from "react";
import { useEffect, useState } from "react";
import { motion, time } from "framer-motion";
import httpService from "../services/httpService.js";
import LoadingThreeDotsJumping from "../components/LoadingThreeDotsJumping.jsx";
import Weather from "./Weather.jsx";
import Forecast from "./Forecast";
import Tabs from "./Tabs.jsx";


export default function Init() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 🔸 Pedimos permiso al usuario para acceder a su ubicación
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    
                    // Esperar 1 segundo antes de hacer la petición
                    setTimeout(() => {
                        httpService.fetchWeather(latitude, longitude)
                            .then(data => {
                                console.log("data obtenida fetchWeather:", data);
                                setData(data);
                                setLoading(false);
                            })
                            .catch(err => {
                                console.error(err);
                                setError("No se pudo obtener el clima");
                                setLoading(false);
                            });
                    }, 1000); // Esperar 1000ms = 1 segundo
                },
                (err) => {
                    console.error(err);
                    setError("No se pudo obtener la ubicación");
                    setLoading(false);
                }
            );
        } else {
            setError("La geolocalización no está disponible en este navegador");
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="div-container">
                <LoadingThreeDotsJumping />
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="div-container">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (  
        <div>
            <Tabs weatherData={data} />
        </div>
    );
}