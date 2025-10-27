import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import './CountrySelect.css';
import httpService from '../services/httpService';

export default function CountrySelect() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para hacer GET cuando se selecciona un país
  const fetchWeatherForCountry = async (country) => {
    if (!country) return;
    
    setLoading(true);
    try {
      // Ejemplo de GET request - ajusta la URL según tu API
      const response = await httpService.fetchByCountry(country.label);
      setWeatherData(response);
      console.log('Datos del clima para', country.label, ':', response);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
    setLoading(false);
  };

  // Handler cuando cambia la selección
  const handleCountryChange = (event, newValue) => {
    setSelectedCountry(newValue);
    console.log('País seleccionado:', newValue);
    
  };

  return (
    <div className="country-select-container">
      <h2 className="country-select-title">Selecciona un País</h2>
      
      <Autocomplete
        id="country-select-demo"
        className="country-autocomplete"
        sx={{ width: 300 }}
        options={countries}
        autoHighlight
        value={selectedCountry}
        onChange={handleCountryChange}
        getOptionLabel={(option) => option.label}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            className="country-option"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label} ({option.code}) - {option.postalCode}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
    
    {/* Información del país seleccionado */}
    {selectedCountry && (
        <Button 
          className="weather-button"
          variant="contained" 
          onClick={() => fetchWeatherForCountry(selectedCountry)}
          disabled={loading}
        >
          {loading ? <span className="loading-text">Cargando...</span> : 'Obtener Clima'}
        </Button>
      
    )}
    
    {/* Mostrar datos del clima si existen */}
    {weatherData && (
      <div className="weather-data-container">
        <h3>Datos del Clima:</h3>
        <p><strong>Temperatura:</strong> {weatherData.currentConditions.temp} °C</p>
        <p><strong>Condición:</strong> {weatherData.currentConditions.conditions}</p>
        <p><strong>Humedad:</strong> {weatherData.currentConditions.humidity} %</p>
        <p><strong>Presión:</strong> {weatherData.currentConditions.pressure} hPa</p>
        <p><strong>Sensación Térmica:</strong> {weatherData.currentConditions.feelslike} °C</p>
        <p><strong>UV:</strong> {weatherData.currentConditions.uvindex}</p>
        <p><strong>Viento:</strong> {weatherData.currentConditions.windspeed} km/h</p>

      </div>
    )}
  </div>
  );
}

// Lista de países con códigos postales
const countries = [
  { code: 'AD', label: 'Andorra', postalCode: 'AD###' },
  { code: 'AE', label: 'United Arab Emirates', postalCode: '#####' },
  { code: 'AF', label: 'Afghanistan', postalCode: '####' },
  { code: 'AG', label: 'Antigua and Barbuda', postalCode: 'No postal code' },
  { code: 'AI', label: 'Anguilla', postalCode: 'AI-2640' },
  { code: 'AL', label: 'Albania', postalCode: '####' },
  { code: 'AM', label: 'Armenia', postalCode: '####' },
  { code: 'AO', label: 'Angola', postalCode: 'No postal code' },
  { code: 'AQ', label: 'Antarctica', postalCode: 'No postal code' },
  { code: 'AR', label: 'Argentina', postalCode: '####' },
  { code: 'AS', label: 'American Samoa', postalCode: '#####-####' },
  { code: 'AT', label: 'Austria', postalCode: '####' },
  { code: 'AU', label: 'Australia', postalCode: '####', suggested: true },
  { code: 'AW', label: 'Aruba', postalCode: 'No postal code' },
  { code: 'AX', label: 'Alland Islands', postalCode: '#####' },
  { code: 'AZ', label: 'Azerbaijan', postalCode: 'AZ ####' },
  { code: 'BA', label: 'Bosnia and Herzegovina', postalCode: '#####' },
  { code: 'BB', label: 'Barbados', postalCode: 'BB#####' },
  { code: 'BD', label: 'Bangladesh', postalCode: '####' },
  { code: 'BE', label: 'Belgium', postalCode: '####' },
  { code: 'BF', label: 'Burkina Faso', postalCode: 'No postal code' },
  { code: 'BG', label: 'Bulgaria', postalCode: '####' },
  { code: 'BH', label: 'Bahrain', postalCode: '###' },
  { code: 'BI', label: 'Burundi', postalCode: 'No postal code' },
  { code: 'BJ', label: 'Benin', postalCode: 'No postal code' },
  { code: 'BL', label: 'Saint Barthelemy', postalCode: '#####' },
  { code: 'BM', label: 'Bermuda', postalCode: 'AA ##' },
  { code: 'BN', label: 'Brunei Darussalam', postalCode: 'AA####' },
  { code: 'BO', label: 'Bolivia', postalCode: '####' },
  { code: 'BR', label: 'Brazil', postalCode: '#####-###' },
  { code: 'BS', label: 'Bahamas', postalCode: 'No postal code' },
  { code: 'BT', label: 'Bhutan', postalCode: '#####' },
  { code: 'BV', label: 'Bouvet Island', postalCode: 'No postal code' },
  { code: 'BW', label: 'Botswana', postalCode: 'No postal code' },
  { code: 'BY', label: 'Belarus', postalCode: '######' },
  { code: 'BZ', label: 'Belize', postalCode: 'No postal code' },
  { code: 'CA', label: 'Canada', postalCode: 'A#A #A#', suggested: true },
  { code: 'CC', label: 'Cocos (Keeling) Islands', postalCode: '####' },
  { code: 'CD', label: 'Congo, Democratic Republic of the', postalCode: 'No postal code' },
  { code: 'CF', label: 'Central African Republic', postalCode: 'No postal code' },
  { code: 'CG', label: 'Congo, Republic of the', postalCode: 'No postal code' },
  { code: 'CH', label: 'Switzerland', postalCode: '####' },
  { code: 'CI', label: "Cote d'Ivoire", postalCode: 'No postal code' },
  { code: 'CK', label: 'Cook Islands', postalCode: 'No postal code' },
  { code: 'CL', label: 'Chile', postalCode: '#######' },
  { code: 'CM', label: 'Cameroon', postalCode: 'No postal code' },
  { code: 'CN', label: 'China', postalCode: '######' },
  { code: 'CO', label: 'Colombia', postalCode: '######' },
  { code: 'CR', label: 'Costa Rica', postalCode: '#####' },
  { code: 'CU', label: 'Cuba', postalCode: '#####' },
  { code: 'CV', label: 'Cape Verde', postalCode: '####' },
  { code: 'CW', label: 'Curacao', postalCode: 'No postal code' },
  { code: 'CX', label: 'Christmas Island', postalCode: '####' },
  { code: 'CY', label: 'Cyprus', postalCode: '####' },
  { code: 'CZ', label: 'Czech Republic', postalCode: '### ##' },
  { code: 'DE', label: 'Germany', postalCode: '#####', suggested: true },
  { code: 'DJ', label: 'Djibouti', postalCode: 'No postal code' },
  { code: 'DK', label: 'Denmark', postalCode: '####' },
  { code: 'DM', label: 'Dominica', postalCode: 'No postal code' },
  { code: 'DO', label: 'Dominican Republic', postalCode: '#####' },
  { code: 'DZ', label: 'Algeria', postalCode: '#####' },
  { code: 'EC', label: 'Ecuador', postalCode: '######' },
  { code: 'EE', label: 'Estonia', postalCode: '#####' },
  { code: 'EG', label: 'Egypt', postalCode: '#####' },
  { code: 'EH', label: 'Western Sahara', postalCode: '#####' },
  { code: 'ER', label: 'Eritrea', postalCode: 'No postal code' },
  { code: 'ES', label: 'Spain', postalCode: '#####' },
  { code: 'ET', label: 'Ethiopia', postalCode: '####' },
  { code: 'FI', label: 'Finland', postalCode: '#####' },
  { code: 'FJ', label: 'Fiji', postalCode: 'No postal code' },
  { code: 'FK', label: 'Falkland Islands (Malvinas)', postalCode: 'FIQQ 1ZZ' },
  { code: 'FM', label: 'Micronesia, Federated States of', postalCode: '#####' },
  { code: 'FO', label: 'Faroe Islands', postalCode: '###' },
  { code: 'FR', label: 'France', postalCode: '#####', suggested: true },
  { code: 'GA', label: 'Gabon', postalCode: 'No postal code' },
  { code: 'GB', label: 'United Kingdom', postalCode: 'AA## #AA' },
  { code: 'GD', label: 'Grenada', postalCode: 'No postal code' },
  { code: 'GE', label: 'Georgia', postalCode: '####' },
  { code: 'GF', label: 'French Guiana', postalCode: '#####' },
  { code: 'GG', label: 'Guernsey', postalCode: 'AA## #AA' },
  { code: 'GH', label: 'Ghana', postalCode: 'No postal code' },
  { code: 'GI', label: 'Gibraltar', postalCode: 'GX11 1AA' },
  { code: 'GL', label: 'Greenland', postalCode: '####' },
  { code: 'GM', label: 'Gambia', postalCode: 'No postal code' },
  { code: 'GN', label: 'Guinea', postalCode: '###' },
  { code: 'GP', label: 'Guadeloupe', postalCode: '#####' },
  { code: 'GQ', label: 'Equatorial Guinea', postalCode: 'No postal code' },
  { code: 'GR', label: 'Greece', postalCode: '### ##' },
  { code: 'GS', label: 'South Georgia and the South Sandwich Islands', postalCode: 'SIQQ 1ZZ' },
  { code: 'GT', label: 'Guatemala', postalCode: '#####' },
  { code: 'GU', label: 'Guam', postalCode: '#####' },
  { code: 'GW', label: 'Guinea-Bissau', postalCode: '####' },
  { code: 'GY', label: 'Guyana', postalCode: 'No postal code' },
  { code: 'HK', label: 'Hong Kong', postalCode: 'No postal code' },
  { code: 'HM', label: 'Heard Island and McDonald Islands', postalCode: '####' },
  { code: 'HN', label: 'Honduras', postalCode: '#####' },
  { code: 'HR', label: 'Croatia', postalCode: '#####' },
  { code: 'HT', label: 'Haiti', postalCode: '####' },
  { code: 'HU', label: 'Hungary', postalCode: '####' },
  { code: 'ID', label: 'Indonesia', postalCode: '#####' },
  { code: 'IE', label: 'Ireland', postalCode: 'A## ####' },
  { code: 'IL', label: 'Israel', postalCode: '#######' },
  { code: 'IM', label: 'Isle of Man', postalCode: 'AA## #AA' },
  { code: 'IN', label: 'India', postalCode: '######' },
  { code: 'IO', label: 'British Indian Ocean Territory', postalCode: 'BBND 1ZZ' },
  { code: 'IQ', label: 'Iraq', postalCode: '#####' },
  { code: 'IR', label: 'Iran, Islamic Republic of', postalCode: '#####-#####' },
  { code: 'IS', label: 'Iceland', postalCode: '###' },
  { code: 'IT', label: 'Italy', postalCode: '#####' },
  { code: 'JE', label: 'Jersey', postalCode: 'AA## #AA' },
  { code: 'JM', label: 'Jamaica', postalCode: 'AA ##' },
  { code: 'JO', label: 'Jordan', postalCode: '#####' },
  { code: 'JP', label: 'Japan', postalCode: '###-####', suggested: true },
  { code: 'KE', label: 'Kenya', postalCode: '#####' },
  { code: 'KG', label: 'Kyrgyzstan', postalCode: '######' },
  { code: 'KH', label: 'Cambodia', postalCode: '#####' },
  { code: 'KI', label: 'Kiribati', postalCode: 'No postal code' },
  { code: 'KM', label: 'Comoros', postalCode: 'No postal code' },
  { code: 'KN', label: 'Saint Kitts and Nevis', postalCode: 'No postal code' },
  { code: 'KP', label: "Korea, Democratic People's Republic of", postalCode: '###-###' },
  { code: 'KR', label: 'Korea, Republic of', postalCode: '#####' },
  { code: 'KW', label: 'Kuwait', postalCode: '#####' },
  { code: 'KY', label: 'Cayman Islands', postalCode: 'AA#-####' },
  { code: 'KZ', label: 'Kazakhstan', postalCode: '######' },
  { code: 'LA', label: "Lao People's Democratic Republic", postalCode: '#####' },
  { code: 'LB', label: 'Lebanon', postalCode: '#### ####' },
  { code: 'LC', label: 'Saint Lucia', postalCode: 'No postal code' },
  { code: 'LI', label: 'Liechtenstein', postalCode: '####' },
  { code: 'LK', label: 'Sri Lanka', postalCode: '#####' },
  { code: 'LR', label: 'Liberia', postalCode: '####' },
  { code: 'LS', label: 'Lesotho', postalCode: '###' },
  { code: 'LT', label: 'Lithuania', postalCode: 'LT-#####' },
  { code: 'LU', label: 'Luxembourg', postalCode: '####' },
  { code: 'LV', label: 'Latvia', postalCode: 'LV-####' },
  { code: 'LY', label: 'Libya', postalCode: '#####' },
  { code: 'MA', label: 'Morocco', postalCode: '#####' },
  { code: 'MC', label: 'Monaco', postalCode: '#####' },
  { code: 'MD', label: 'Moldova, Republic of', postalCode: 'MD-####' },
  { code: 'ME', label: 'Montenegro', postalCode: '#####' },
  { code: 'MF', label: 'Saint Martin (French part)', postalCode: '#####' },
  { code: 'MG', label: 'Madagascar', postalCode: '###' },
  { code: 'MH', label: 'Marshall Islands', postalCode: '#####' },
  { code: 'MK', label: 'Macedonia, the Former Yugoslav Republic of', postalCode: '####' },
  { code: 'ML', label: 'Mali', postalCode: 'No postal code' },
  { code: 'MM', label: 'Myanmar', postalCode: '#####' },
  { code: 'MN', label: 'Mongolia', postalCode: '######' },
  { code: 'MO', label: 'Macao', postalCode: 'No postal code' },
  { code: 'MP', label: 'Northern Mariana Islands', postalCode: '#####' },
  { code: 'MQ', label: 'Martinique', postalCode: '#####' },
  { code: 'MR', label: 'Mauritania', postalCode: 'No postal code' },
  { code: 'MS', label: 'Montserrat', postalCode: 'No postal code' },
  { code: 'MT', label: 'Malta', postalCode: 'AAA ####' },
  { code: 'MU', label: 'Mauritius', postalCode: '#####' },
  { code: 'MV', label: 'Maldives', postalCode: '#####' },
  { code: 'MW', label: 'Malawi', postalCode: 'No postal code' },
  { code: 'MX', label: 'Mexico', postalCode: '#####' },
  { code: 'MY', label: 'Malaysia', postalCode: '#####' },
  { code: 'MZ', label: 'Mozambique', postalCode: '####' },
  { code: 'NA', label: 'Namibia', postalCode: '#####' },
  { code: 'NC', label: 'New Caledonia', postalCode: '#####' },
  { code: 'NE', label: 'Niger', postalCode: '####' },
  { code: 'NF', label: 'Norfolk Island', postalCode: '####' },
  { code: 'NG', label: 'Nigeria', postalCode: '######' },
  { code: 'NI', label: 'Nicaragua', postalCode: '#####' },
  { code: 'NL', label: 'Netherlands', postalCode: '#### AA' },
  { code: 'NO', label: 'Norway', postalCode: '####' },
  { code: 'NP', label: 'Nepal', postalCode: '#####' },
  { code: 'NR', label: 'Nauru', postalCode: 'No postal code' },
  { code: 'NU', label: 'Niue', postalCode: 'No postal code' },
  { code: 'NZ', label: 'New Zealand', postalCode: '####' },
  { code: 'OM', label: 'Oman', postalCode: '###' },
  { code: 'PA', label: 'Panama', postalCode: '######' },
  { code: 'PE', label: 'Peru', postalCode: '#####' },
  { code: 'PF', label: 'French Polynesia', postalCode: '#####' },
  { code: 'PG', label: 'Papua New Guinea', postalCode: '###' },
  { code: 'PH', label: 'Philippines', postalCode: '####' },
  { code: 'PK', label: 'Pakistan', postalCode: '#####' },
  { code: 'PL', label: 'Poland', postalCode: '##-###' },
  { code: 'PM', label: 'Saint Pierre and Miquelon', postalCode: '#####' },
  { code: 'PN', label: 'Pitcairn', postalCode: 'PCRN 1ZZ' },
  { code: 'PR', label: 'Puerto Rico', postalCode: '#####' },
  { code: 'PS', label: 'Palestine, State of', postalCode: '###' },
  { code: 'PT', label: 'Portugal', postalCode: '####-###' },
  { code: 'PW', label: 'Palau', postalCode: '#####' },
  { code: 'PY', label: 'Paraguay', postalCode: '####' },
  { code: 'QA', label: 'Qatar', postalCode: 'No postal code' },
  { code: 'RE', label: 'Reunion', postalCode: '#####' },
  { code: 'RO', label: 'Romania', postalCode: '######' },
  { code: 'RS', label: 'Serbia', postalCode: '#####' },
  { code: 'RU', label: 'Russian Federation', postalCode: '######' },
  { code: 'RW', label: 'Rwanda', postalCode: 'No postal code' },
  { code: 'SA', label: 'Saudi Arabia', postalCode: '#####' },
  { code: 'SB', label: 'Solomon Islands', postalCode: 'No postal code' },
  { code: 'SC', label: 'Seychelles', postalCode: 'No postal code' },
  { code: 'SD', label: 'Sudan', postalCode: '#####' },
  { code: 'SE', label: 'Sweden', postalCode: '### ##' },
  { code: 'SG', label: 'Singapore', postalCode: '######' },
  { code: 'SH', label: 'Saint Helena', postalCode: 'STHL 1ZZ' },
  { code: 'SI', label: 'Slovenia', postalCode: '####' },
  { code: 'SJ', label: 'Svalbard and Jan Mayen', postalCode: '####' },
  { code: 'SK', label: 'Slovakia', postalCode: '### ##' },
  { code: 'SL', label: 'Sierra Leone', postalCode: 'No postal code' },
  { code: 'SM', label: 'San Marino', postalCode: '4789#' },
  { code: 'SN', label: 'Senegal', postalCode: '#####' },
  { code: 'SO', label: 'Somalia', postalCode: 'AA #####' },
  { code: 'SR', label: 'Suriname', postalCode: 'No postal code' },
  { code: 'SS', label: 'South Sudan', postalCode: 'No postal code' },
  { code: 'ST', label: 'Sao Tome and Principe', postalCode: 'No postal code' },
  { code: 'SV', label: 'El Salvador', postalCode: '####' },
  { code: 'SX', label: 'Sint Maarten (Dutch part)', postalCode: 'No postal code' },
  { code: 'SY', label: 'Syrian Arab Republic', postalCode: 'No postal code' },
  { code: 'SZ', label: 'Swaziland', postalCode: 'A###' },
  { code: 'TC', label: 'Turks and Caicos Islands', postalCode: 'TKCA 1ZZ' },
  { code: 'TD', label: 'Chad', postalCode: 'No postal code' },
  { code: 'TF', label: 'French Southern Territories', postalCode: 'No postal code' },
  { code: 'TG', label: 'Togo', postalCode: 'No postal code' },
  { code: 'TH', label: 'Thailand', postalCode: '#####' },
  { code: 'TJ', label: 'Tajikistan', postalCode: '######' },
  { code: 'TK', label: 'Tokelau', postalCode: 'No postal code' },
  { code: 'TL', label: 'Timor-Leste', postalCode: 'No postal code' },
  { code: 'TM', label: 'Turkmenistan', postalCode: '######' },
  { code: 'TN', label: 'Tunisia', postalCode: '####' },
  { code: 'TO', label: 'Tonga', postalCode: 'No postal code' },
  { code: 'TR', label: 'Turkey', postalCode: '#####' },
  { code: 'TT', label: 'Trinidad and Tobago', postalCode: '######' },
  { code: 'TV', label: 'Tuvalu', postalCode: 'No postal code' },
  { code: 'TW', label: 'Taiwan', postalCode: '#####' },
  { code: 'TZ', label: 'United Republic of Tanzania', postalCode: '#####' },
  { code: 'UA', label: 'Ukraine', postalCode: '#####' },
  { code: 'UG', label: 'Uganda', postalCode: 'No postal code' },
  { code: 'US', label: 'United States', postalCode: '#####', suggested: true },
  { code: 'UY', label: 'Uruguay', postalCode: '#####' },
  { code: 'UZ', label: 'Uzbekistan', postalCode: '######' },
  { code: 'VA', label: 'Holy See (Vatican City State)', postalCode: '00120' },
  { code: 'VC', label: 'Saint Vincent and the Grenadines', postalCode: 'No postal code' },
  { code: 'VE', label: 'Venezuela', postalCode: '####' },
  { code: 'VG', label: 'British Virgin Islands', postalCode: 'VG####' },
  { code: 'VI', label: 'US Virgin Islands', postalCode: '#####' },
  { code: 'VN', label: 'Vietnam', postalCode: '######' },
  { code: 'VU', label: 'Vanuatu', postalCode: 'No postal code' },
  { code: 'WF', label: 'Wallis and Futuna', postalCode: '#####' },
  { code: 'WS', label: 'Samoa', postalCode: 'No postal code' },
  { code: 'XK', label: 'Kosovo', postalCode: '#####' },
  { code: 'YE', label: 'Yemen', postalCode: 'No postal code' },
  { code: 'YT', label: 'Mayotte', postalCode: '#####' },
  { code: 'ZA', label: 'South Africa', postalCode: '####' },
  { code: 'ZM', label: 'Zambia', postalCode: '#####' },
  { code: 'ZW', label: 'Zimbabwe', postalCode: 'No postal code' },
];
