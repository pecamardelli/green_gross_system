
export async function geocodeQuery(query, searchManager) {
    if (!searchManager) return console.log("No search manager provided.");

    const searchRequest = {
        where: query,
        callback: function (r) {
            //Add the first result to the map and zoom into it.
            if (r && r.results && r.results.length > 0) {
                /*
                window.pin = new window.Microsoft.Maps.Pushpin(r.results[0].location, {
                    title: 'You are here',
                    subTitle: query,
                    text: '1'
                });
                map.entities.push(window.pin);
                map.setView({ bounds: r.results[0].bestView });
                */
               window.newLocation = r.results[0].location;
            }
        },
        errorCallback: function (e) {
            //If there is an error, alert the user about it.
            alert("No results found.");
        }
    };

    //Make the geocode request.
    searchManager.geocode(searchRequest);
}

export function getDistance(apiKey, myLocation, locations) {
    const requestUrl = 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key=' + apiKey;

    const origins = [{
       latitude: myLocation.latitude,
       longitude: myLocation.longitude 
    }];

    const destinations = locations
        .map(l => ({ latitude: l.latitude, longitude: l.longitude }));
 
    const requestBody = {
        "origins": origins,
        "destinations": destinations,
        "travelMode": "driving"
    };

    const http = new XMLHttpRequest();
    http.open("POST", requestUrl, true);

    //Send the content type in the header information along with the request.
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            //Request was successful, do something with it.
            const result = JSON.parse(http.responseText);

            //Output a formatted version of the JSON response.
            //document.getElementById('output').value = JSON.stringify(result, null, 4);
            //const res = JSON.stringify(result, null, 4);
            //window.bm_distances = result.resourceSets[0].resources[0].results;
            /*
            window.bm_distances = destinations.map((loc, index) => {
                return {
                    ...loc,
                    distance: result.resourceSets[0].resources[0].results[index].travelDistance
                }
                //result.resourceSets[0].resources[0].results
            });
            */
            window.locationsWithDistance = locations.map((loc, index) => {
                loc.travelDistance = result.resourceSets[0].resources[0].results[index].travelDistance;
                loc.travelDuration = result.resourceSets[0].resources[0].results[index].travelDuration;
                return loc;
            });
            //console.log(result.resourceSets[0].resources[0].results);
        }
    }

    //Convert the JSON request body into a string and pass it into the request.
    http.send(JSON.stringify(requestBody));
}

export async function calculateDirection(directionsManager, address1, address2) {
    //Load the directions module.
    //Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
        //Create an instance of the directions manager.
        //const directionsManager = await new window.Microsoft.Maps.Directions.DirectionsManager(map);
        directionsManager.clearAll();
        directionsManager.clearDisplay();

        //directionsManager.removeWaypoint(0);
        //directionsManager.removeWaypoint(1);
        
        
        //Create waypoints to route between.
        //const seattleWaypoint = new Microsoft.Maps.Directions.Waypoint({ address: address1 });
        //directionsManager.addWaypoint(seattleWaypoint);

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

        //Specify the element in which the itinerary will be rendered.
        //directionsManager.setRenderOptions({ itineraryContainer: '#directionsItinerary' });

        //Calculate directions.
        directionsManager.calculateDirections();
    //});
} 