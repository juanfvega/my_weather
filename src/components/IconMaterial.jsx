import {
  // Sol / Nubes
  WbSunny as WbSunnyIcon,
  NightsStay as NightsStayIcon,
  Cloud as CloudIcon,
  CloudQueue as CloudQueueIcon,
  FilterDrama as FogIcon,

  // Lluvia / Agua
  WaterDrop as WaterDropIcon,
  Thunderstorm as ThunderstormIcon,

  // Nieve / Hielo
  AcUnit as SnowIcon,
  Grain as HailIcon,

  // Viento
  Air as AirIcon,

  // Otros / fallback
  HelpOutline as DefaultIcon,
} from "@mui/icons-material";

// Mapeo completo de íconos de Visual Crossing
export const iconMap = {
  // Conjunto icons1 (básico)
  "snow": <SnowIcon fontSize="large" htmlColor="skyblue" />,
  "rain": <WaterDropIcon fontSize="large" htmlColor="dodgerblue" />,
  "fog": <FogIcon fontSize="large" htmlColor="gray" />,
  "wind": <AirIcon fontSize="large" htmlColor="lightblue" />,
  "cloudy": <CloudIcon fontSize="large" htmlColor="lightgray" />,
  "partly-cloudy-day": <CloudQueueIcon fontSize="large" htmlColor="goldenrod" />,
  "partly-cloudy-night": <CloudQueueIcon fontSize="large" htmlColor="gray" />,
  "clear-day": <WbSunnyIcon fontSize="large" htmlColor="goldenrod" />,
  "clear-night": <NightsStayIcon fontSize="large" htmlColor="darkblue" />,

  // Conjunto icons2 (extendido)
  "snow-showers-day": <SnowIcon fontSize="large" htmlColor="skyblue" />,
  "snow-showers-night": <SnowIcon fontSize="large" htmlColor="lightsteelblue" />,
  "thunder-rain": <ThunderstormIcon fontSize="large" htmlColor="purple" />,
  "thunder-showers-day": <ThunderstormIcon fontSize="large" htmlColor="orange" />,
  "thunder-showers-night": <ThunderstormIcon fontSize="large" htmlColor="violet" />,
  "showers-day": <WaterDropIcon fontSize="large" htmlColor="cornflowerblue" />,
  "showers-night": <WaterDropIcon fontSize="large" htmlColor="steelblue" />,

  // Extras no oficiales (DarkSky legacy)
  "hail": <HailIcon fontSize="large" htmlColor="gray" />,
  "rain-snow": <WaterDropIcon fontSize="large" htmlColor="lightskyblue" />,
  "rain-snow-showers-day": <WaterDropIcon fontSize="large" htmlColor="deepskyblue" />,
  "rain-snow-showers-night": <WaterDropIcon fontSize="large" htmlColor="lightsteelblue" />,

  // Fallback
  "default": <DefaultIcon fontSize="large" htmlColor="gray" />,
};
