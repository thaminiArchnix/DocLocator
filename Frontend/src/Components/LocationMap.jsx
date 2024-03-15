import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader';

const LocationMap = ({ onSelectLocation }) => {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const libraries = ["places"];
  
  //decide container style - width and height
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  //decide center of map : if selected location exist set to that or else set to default values
  const center = {
    lat: selectedLocation ? selectedLocation.lat : 8,
    lng: selectedLocation? selectedLocation.lng: 80,
  };

  //decides if map is loaded
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDeA5U3PfjEtKC-lQnEQ7iO9gn8snYBSMs ',
    libraries
  });

  //sets the map to the loaded map instance when it loads
  const onLoad = (map) => {
    setMap(map);
  };

  //sets the maps selected coordinates to the coordinates that were clicked on
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
      zoom={7}
      onLoad={onLoad}
      onClick={onMapClick}
    >
      {selectedLocation && <Marker position={selectedLocation} />}
      
    </GoogleMap>
  ) : null;
};

export default LocationMap;