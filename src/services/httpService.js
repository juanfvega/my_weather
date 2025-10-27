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


const fetchByCountry = async (countryData) => {
  try {
    // Obtener el nombre del país del objeto seleccionado
    let location = '';
    
    if (typeof countryData === 'object' && countryData.label) {
      // Si es el objeto del selector de países
      location = countryData.label;
    } else if (typeof countryData === 'string') {
      // Si es directamente un string
      location = countryData;
    } else {
      throw new Error('Formato de país inválido');
    }

    // Construir URL con el nombre del país
    const url = `${BASE_URL}/${encodeURIComponent(location)}?unitGroup=metric&key=${YOUR_API_KEY}&contentType=json&include=days,hours,current&lang=es`;

    console.log(`🌍 Consultando clima para: ${location}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: Error al obtener el clima por país`);
    }
    
    const data = await response.json();
    
    // Agregar información del país consultado
    return {
      ...data,
      requestedCountry: {
        name: location,
        code: countryData.code || null,
        postalCode: countryData.postalCode || null
      }
    };
    
  } catch (error) {
    console.error('❌ Error en fetchByCountry:', error);
    throw error;
  } 
};

// Export the service as default
const httpService = {
  fetchWeather,
  fetchByCountry
};

export default httpService;