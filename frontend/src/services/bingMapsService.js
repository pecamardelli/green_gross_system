export async function calculateDirection(directionsManager, address1, address2) {
    directionsManager.clearAll();
    directionsManager.clearDisplay();

    const myLocation = new window.Microsoft.Maps.Directions.Waypoint({
        address: address1.subtitle,
        location: new window.Microsoft.Maps.Location(address1.latitude, address1.longitude)
    });
    directionsManager.addWaypoint(myLocation);

    const destination = new window.Microsoft.Maps.Directions.Waypoint({
        address: address2.subtitle,
        location: new window.Microsoft.Maps.Location(address2.latitude, address2.longitude)
    });
    directionsManager.addWaypoint(destination);

    //Calculate directions.
    directionsManager.calculateDirections();
} 