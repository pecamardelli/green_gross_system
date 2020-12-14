
export async function getCoords(query, map) {
    let coordinates;
    let searchManager;

    //window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', async function () {
        searchManager = await new window.Microsoft.Maps.Search.SearchManager(map);
    //});

    const searchRequest = {
        where: query,
        callback: function (r) {
            //Add the first result to the map and zoom into it.
            if (r && r.results && r.results.length > 0) {
                var pin = new window.Microsoft.Maps.Pushpin(r.results[0].location, {
                    title: 'Your are here',
                    subTitle: query,
                    text: '1'
                });
                map.entities.push(pin);
                map.setView({ bounds: r.results[0].bestView });
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