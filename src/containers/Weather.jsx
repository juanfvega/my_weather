import { useEffect, useState } from "react";
import { motion, time } from "framer-motion";
import httpService from "../services/httpService.js";
import LoadingThreeDotsJumping from "../components/LoadingThreeDotsJumping.jsx";
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import { iconMap } from "../components/IconMaterial.jsx";
import "./Weather.css";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(null);

// Mapeo del ícono del clima
const iconName = weather?.currentConditions?.icon || "default";
const WeatherIcon = iconMap[iconName] || iconMap["default"];

  // Función para formatear el timezone
  const formatTimezone = (timezone) => {
    if (!timezone) return "";
    // Remover "America/" y reemplazar "/" con espacios
    return timezone
      .replace("America/", "")
      .replace(/\//g, " ");
  };   

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
                setWeather(data);
                const formattedCity = formatTimezone(data.timezone);
                setCity(formattedCity);
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

  

if (loading)
  return (
    <div className="div-container">
      <LoadingThreeDotsJumping />
    </div>
  );
  
  if (error) return (
    <div className="div-container">
      <p>Error: {error}</p>
    </div>
  );

  return (
    <div className="div-container">
      <div className="cards-container">
        {/* Card del Clima */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{city}</h3>
          </div>
          <div className="card-content">  
            <div className="row">
              <div className="column">
                {WeatherIcon}
                <p className="p-text-title">Temp actual:</p>
                <span className="value">{weather.currentConditions.temp} °C</span>
              </div>
              <div className="column">
                <DeviceThermostatOutlinedIcon />
                <p className="p-text-title">Sensación térmica:</p>
                <span className="value">{weather.currentConditions.feelslike} °C</span>
              </div>
              <div className="column">
                <WaterDropOutlinedIcon />
                <p className="p-text-title">Humedad:</p>
                <span className="value">{weather.currentConditions.humidity}%</span>
              </div>
            </div>
            <div className="column">
              <AirOutlinedIcon />
              <p className="p-text-title">Viento:</p>
              <span className="value">{weather.currentConditions.windspeed} km/h</span>
            </div>
            <div className="column">
              <p className="p-text-title">Condición:</p>
              <span className="value">{weather.currentConditions.conditions}</span>
            </div>
            <div className="column">
                <p className="p-text-title">{weather.description}</p>
              </div>
          </div>
        </div>
      </div>
    </div>  

  );
}
