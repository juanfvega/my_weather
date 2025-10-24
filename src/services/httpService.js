const YOUR_API_KEY = 'LCH4DUSVMHPESKLPQP3LDBEW9';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';


const fetchWeather = async (lat, lon) => {
      try {
        const url = `${BASE_URL}/${lat},${lon}?unitGroup=metric&key=${YOUR_API_KEY}&contentType=json`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al obtener el clima");
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      } 

    };

// Export the service as default
const httpService = {
  fetchWeather
};

export default httpService;