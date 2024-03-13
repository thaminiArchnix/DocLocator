import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const LocationMap = ({ onSelectLocation }) => {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

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
