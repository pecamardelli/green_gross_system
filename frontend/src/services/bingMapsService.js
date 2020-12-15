
export async function geocodeQuery(query, map) {
    const searchManager = await new window.Microsoft.Maps.Search.SearchManager(map);

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
    return searchManager.geocode(searchRequest);
}

export function getDistance(apiKey, locations) {
    const requestUrl = 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key=' + apiKey;

    const origins = locations
        .filter(loc => loc.description === 'You are here')
        .map(l => ({ latitude: l.latitude, longitude: l.longitude }));

    const destinations = locations
        .filter(loc => loc.description !== 'You are here')
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
            window.locationsWithDistance = locations.map(loc => {
                const index = destinations.findIndex(i =>
                    i.latitude === loc.latitude && i.longitude === loc.longitude
                );

                if (index >= 0) loc.distance = result.resourceSets[0].resources[0].results[index].travelDistance;
                return loc;
            });

            //console.log(result.resourceSets[0].resources[0].results);
        }
    }

    //Convert the JSON request body into a string and pass it into the request.
    http.send(JSON.stringify(requestBody));
}