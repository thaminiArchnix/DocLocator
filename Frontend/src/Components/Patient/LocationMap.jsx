import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const LocationMap = ({ onSelectLocation }) => {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState('');

  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: selectedLocation ? selectedLocation.lat : 8,
    lng: selectedLocation? selectedLocation.lng: 80,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDeA5U3PfjEtKC-lQnEQ7iO9gn8snYBSMs ',
  });

  const onLoad = (map) => {
    setMap(map);
  };

  const onMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    onSelectLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });

    getAddress(event.latLng.lat(), event.latLng.lng());
  };

  const getAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY_HERE`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onClick={onMapClick}
    >
      {selectedLocation && <Marker position={selectedLocation} />}
    </GoogleMap>
  ) : null;
};

export default LocationMap;
