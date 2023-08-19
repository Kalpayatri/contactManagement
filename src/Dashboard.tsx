import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Dashboard: React.FC = () => {
  // Fetch worldwide data
  const { data: worldwideData } = useQuery('worldwide', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/all');
    return response.data;
  });

  // Fetch country-specific data
  const { data: countriesData } = useQuery('countries', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/countries');
    return response.data;
  });

  if (!worldwideData) {
    return <div>Loading...</div>;
  }

  const mapCenter: [number, number] = [0, 0]; // Set the initial center of the map
  const mapZoom: number = 2; // Set the initial zoom level

  return (
    <div>
      {/* Map */}
      <MapContainer
        style={{ height: '500px', width: '100%' }}
        center={mapCenter}
        zoom={mapZoom}
        {...(null as any)} 
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countriesData && countriesData.map((country: any) => (
          <Marker
            key={country.country}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div>
                <h2>{country.country}</h2>
                <p>Total Cases: {country.cases}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Dashboard;
