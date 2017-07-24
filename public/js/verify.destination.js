/* globals $*/
const VERIFY_VISITED_DESTINATION_URL = 'localhost:3001/api/destinations/';

$(() => {
    'use strict';

    const locationLoadPromise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => resolve(pos));
    });

    const getLocationCoordinates = (position) => {
        const coordinates = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
        };

        return coordinates;
    };
});
