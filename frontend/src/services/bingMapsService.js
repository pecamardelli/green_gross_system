
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