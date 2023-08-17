import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const apiUrl = 'http://127.0.0.1:5000/api/data';

function MAP() {
  const [map, setMap] = useState(null);
  const [markersData, setMarkersData] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null); // Agregar estado para la ubicación actual

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(userLocation);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

 // ...

 fetch(apiUrl)
 .then(response => response.json())
 .then(data => {
   console.log("Data received:", data);
   const lastMarkerData = data[data.length - 1]; // Tomar el último objeto del arreglo

   const newMarkersData = data.map(item => {
     const lat = parseFloat(item.latitud);
     const lng = parseFloat(item.longitud);
   
     if (isNaN(lat) || isNaN(lng)) {
       console.error(`Invalid coordinates for marker ${item._id}`);
       return null;
     }
   
     return {
       lat: lat,
       lng: lng,
       title: `Marker ${item._id}`
     };
   }).filter(marker => marker !== null);

   console.log("Mapped markers data:", newMarkersData);

   setMarkersData(newMarkersData);
   setMapCenter(lastMarkerData); // Establecer el centro del mapa en el último marcador
 })
 .catch(error => {
   console.error('Error:', error);
 });


// ...

}, []);
const setMapCenter = (location) => {
  if (map && location) {
    const lat = parseFloat(location.latitud);
    const lng = parseFloat(location.longitud);

    if (!isNaN(lat) && !isNaN(lng)) {
      map.panTo({ lat: lat, lng: lng });
      setMarkersData([...markersData, {
        lat: lat,
        lng: lng,
        title: `Last Marker`
      }]);
    }
  }
};
  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handleCenterChange = () => {
    if (map && currentLocation) {
      map.panTo(currentLocation);
    }
  };

  const mapContainerStyle = {
    width: '100%',
    height: '625px',
  };

  const center = {
    lat: 32.5123,
    lng: -117.0234,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDRgEW9xUSHqkNOykR6Pn53NM_yYC2-1J0">
     <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentLocation || center} // Usar currentLocation si está definido, de lo contrario, usar el centro predeterminado
        zoom={10}
        onLoad={handleMapLoad}
      >
        {markersData.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} title={marker.title} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MAP;

//npx create-react-app google-maps-app
//cd google-maps-app
//npm install @react-google-maps/api
//npm install google-map-react
//AIzaSyDRgEW9xUSHqkNOykR6Pn53NM_yYC2-1J0