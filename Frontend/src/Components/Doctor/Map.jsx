import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect, useState } from 'react';


const Map = (props) => {
    const [address, setAddress] = useState('');
    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: "AIzaSyDeA5U3PfjEtKC-lQnEQ7iO9gn8snYBSMs",
                version: "weekly",
            });

            // Load the Google Maps API
            await loader.load();

            // The location
            const position = { lat: props.latitude, lng: props.longitude };
            // Request needed libraries.
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

            // The map, centered at the position
            const map = new Map(document.getElementById("map"), {
                zoom: 15,
                center: position,
                mapId: "DEMO_MAP_ID",
            });

            // The marker, positioned at the position
            const marker = new AdvancedMarkerElement({
                map: map,
                position: position,
                title: "Marker Title",
            });
            function getAddressFromLatLng (latitude, longitude) {

                return new Promise(async (resolve, reject) => {
                    
                    const geocoder = new google.maps.Geocoder();
                    const latLng = new google.maps.LatLng(latitude, longitude);
            
                    geocoder.geocode({ 'location': latLng }, (results, status) => {
                        if (status === 'OK') {
                            if (results[0]) {
                                resolve(results[0].formatted_address);
                            } else {
                                reject('No results found');
                            }
                        } else {
                            reject('Geocoder failed due to: ' + status);
                        }
                    });
                });
            }
            
        
        
            
            getAddressFromLatLng(props.latitude, props.longitude)
                .then(address => {
                    setAddress(address);
                    
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            
        }

        initMap();
    }, [props.latitude, props.longitude]); // Add dependencies if necessary

    

    return (<>
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
    <div>Location : {address}</div>
    </>);
};

export default Map;
