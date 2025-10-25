import { useState, useEffect } from "react";
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import { iconMap } from "../components/IconMaterial.jsx";
import "./Weather.css";

export default function Weather(props) {
  
  const [city, setCity] = useState(null);

  // Función para formatear el timezone
  const formatTimezone = (timezone) => {
    if (!timezone) return "";
    // Remover "America/" y reemplazar "/" con espacios
    return timezone
      .replace("America/", "")
      .replace(/\//g, " ");
  };   

  // useEffect para actualizar la ciudad cuando cambian las props
  useEffect(() => {
    const formattedCity = formatTimezone(props.timezone);
    setCity(formattedCity);
  }, [props.timezone]);

  // Mapeo del ícono del clima
  const iconName = props?.currentConditions?.icon || "default";
  const WeatherIcon = iconMap[iconName] || iconMap["default"];  

  
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
                <span className="value">{props?.currentConditions?.temp} °C</span>
              </div>
              <div className="column">
                <DeviceThermostatOutlinedIcon />
                <p className="p-text-title">Sensación térmica:</p>
                <span className="value">{props?.currentConditions?.feelslike} °C</span>
              </div>
              <div className="column">
                <WaterDropOutlinedIcon />
                <p className="p-text-title">Humedad:</p>
                <span className="value">{props?.currentConditions?.humidity}%</span>
              </div>
            </div>
            <div className="column">
              <AirOutlinedIcon />
              <p className="p-text-title">Viento:</p>
              <span className="value">{props?.currentConditions?.windspeed} km/h</span>
            </div>
            <div className="column">
              <p className="p-text-title">Condición:</p>
              <span className="value">{props?.currentConditions?.conditions}</span>
            </div>
            <div className="column">
                <p className="p-text-title">{props?.description}</p>
              </div>
          </div>
        </div>
      </div>
    </div>  

  );
}
