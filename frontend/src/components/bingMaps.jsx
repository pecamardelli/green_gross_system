import React, { useEffect, useRef, useState } from 'react';
import { getLocations } from '../services/httpService';
import { calculateDirection } from '../services/bingMapsService';
import { toast } from 'react-toastify';

let map;
let directionsManager;
let searchManager;

function BingMaps(props) {
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState();
  const address = useRef();

  const apiKey = "Aj6-7A0g8ZfYerfMQLQVFt3DvU--RyMpDC8u1g2KV_CFP4plypNxDSWei9wbEpbK";
  const mainAddress = "2 King St W, Hamilton, ON. Postal Code: L8P 1A1";

  const pushPins = () => {
    if (map) {
      map.entities.clear();
  
      for (let loc of locations) {
        //Create custom Pushpins
        const coords = new window.Microsoft.Maps.Location(loc.latitude, loc.longitude);
        const pin = new window.Microsoft.Maps.Pushpin(coords, {
            title: loc.description,
            subTitle: loc.subtitle,
            text: loc.id
        });

        const infobox = new window.Microsoft.Maps.Infobox(coords, {
          title: loc.description,
          description: loc.address,
          visible: false,
          maxHeight: 300,
          maxWidth: 300,
          actions: [
            { label: 'Direction', eventHandler: function () {
                if (userLocation) {
                  infobox.setOptions({ visible: false });
                  calculateDirection(directionsManager, userLocation, loc);
                }
                else
                  toast.error("Enter your address first!");
              }
            }]
        });

        infobox.setMap(map);

        window.Microsoft.Maps.Events.addHandler(pin, 'click', function() {
          infobox.setOptions({ visible: true });
        });
  
        //Add the pushpin to the map
        map.entities.push(pin);
      }

      // Now, add the user location to the map, if it is defined
      if (userLocation) {
        const userPin = userLocation;
        const coords = new window.Microsoft.Maps.Location(userPin.latitude, userPin.longitude);
        const pin = new window.Microsoft.Maps.Pushpin(coords, {
            title: userPin.description,
            subTitle: userPin.subtitle,
            text: userPin.id
        });
  
        //Add the pushpin to the map
        map.entities.push(pin);
      }
    }
  };
  
  if (!map) {
    let loadMap = setInterval(() => {
      if (window.Microsoft) {
        window.clearInterval(loadMap);

        let center;
        if (userLocation)
          center = new window.Microsoft.Maps.Location(userLocation.latitude, userLocation.longitude);
        else
          center = new window.Microsoft.Maps.Location(43.254406, -79.867308);
        
        map = new window.Microsoft.Maps.Map('#myMap', {
          credentials: apiKey,
          center: center,
          mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
              zoom: 15
        });

        window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', function() {
          searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
        });

        window.Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function() {
          directionsManager = new window.Microsoft.Maps.Directions.DirectionsManager(map);
        });

        pushPins();
      }
    }, 1000);
  }

  const getNearestLocation = (myLocation) => {
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
            const locationsWithDistance = locations.map((loc, index) => {
                loc.travelDistance = result.resourceSets[0].resources[0].results[index].travelDistance;
                loc.travelDuration = result.resourceSets[0].resources[0].results[index].travelDuration;
                return loc;
            });

            const nearest = locationsWithDistance.reduce(function(res, loc) {
              return (loc.travelDistance < res.travelDistance) ? loc : res;
            });
    
            const newArray = locationsWithDistance.map(loc => {
              if (loc.travelDistance === nearest.travelDistance) loc.nearest = true;
              else loc.nearest = false;
              return loc;
            });
            
            setLocations(newArray);
            pushPins();
            calculateDirection(directionsManager, myLocation, nearest);
        }
    }

    //Convert the JSON request body into a string and pass it into the request.
    http.send(JSON.stringify(requestBody));
  };

  const setAddress = () => {
    if (!address.current.value) return;
    const searchRequest = {
      where: address.current.value,
      callback: function (r) {
        //Add the first result to the map and zoom into it.
        if (r && r.results && r.results.length > 0) {
          const loc = r.results[0].location;
          const myPushPin = {
            id: Math.round(Math.random() * 1000),
            latitude: loc.latitude,
            longitude: loc.longitude,
            description: "You are here",
            subtitle: "My location",
            address: address.current.value
          };
          
          setUserLocation(myPushPin);
          localStorage.setItem('userLocation', JSON.stringify(myPushPin));
          getNearestLocation(myPushPin);
            //window.newLocation = r.results[0].location;
        }
      },
      errorCallback: function (e) {
          //If there is an error, alert the user about it.
          alert("No results found.");
      }
    };

    //Make the geocode request.
    searchManager.geocode(searchRequest);
  };

  useEffect(() => {
    async function call() {
      const response = await getLocations();
      const locs = await response.json();
      setLocations(locs);

      const jsonData = localStorage.getItem('userLocation');
      setUserLocation(await JSON.parse(jsonData))
    }
    call();
  }, [setLocations, setUserLocation]);

  return (
    <div className="card-transparent bing-maps text-white">
      <div className="card-body row">
        <div className="col-sm-7" id="myMap"></div>
        <div className="col-sm-5">
          <h5>Please, enter your address.</h5>
          <div className="d-flex justify-content-between align-items-center">
            <input ref={address} className="form-control" type="text" placeholder={mainAddress}/>
            <button
              className="btn btn-success"
              onClick={setAddress}
            >Set</button>
          </div>
            <hr />
            <div>
              <h4>
                <strong>Your address:</strong>
              </h4>
              <h5>{userLocation?.address}</h5>
            { locations.map(loc => {
              if (loc.nearest) {
                return (<div>
                    <h5>
                      <strong>The nearest pickup location to you is:</strong>
                    </h5>
                    <h5>{loc.description}</h5>
                    <small>{loc.address}</small>
                    <br />
                    <small>Distance {loc.travelDistance} km</small>
                  </div>);
              }
              return null;
            })}
            </div>
        </div>
      </div>
    </div>
  );
}

export default BingMaps;