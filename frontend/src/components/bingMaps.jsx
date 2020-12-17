import React, { useContext, useEffect, useRef, useState } from 'react';
import { getLocations } from '../services/httpService';
import { geocodeQuery, getDistance, calculateDirection } from '../services/bingMapsService';
import UserContext from './../context/userContext';

let map;
let directionsManager;
let searchManager;

function BingMaps(props) {
  const [locations, setLocations] = useState([]);
  const {userData, setUserData} = useContext(UserContext);
  const address = useRef();
  const apiKey = "Aj6-7A0g8ZfYerfMQLQVFt3DvU--RyMpDC8u1g2KV_CFP4plypNxDSWei9wbEpbK";
  const mainAddress = "2 King St W, Hamilton, ON. Postal Code: L8P 1A1";

  const pushPins = async () => {
    if (map) {
      map.entities.clear();
  
      for (let loc of locations) {
        //Create custom Pushpins
        const coords = await new window.Microsoft.Maps.Location(loc.latitude, loc.longitude);
        const pin = new window.Microsoft.Maps.Pushpin(coords, {
            title: loc.description,
            subTitle: loc.subtitle,
            text: loc.id
        });
  
        //Add the pushpin to the map
        map.entities.push(pin);
      }

      // Now, add the user location to the map, if it is defined
      if (userData.pushpin) {
        const userPin = userData.pushpin;
        const coords = await new window.Microsoft.Maps.Location(userPin.latitude, userPin.longitude);
        const pin = new window.Microsoft.Maps.Pushpin(coords, {
            title: userPin.description,
            subTitle: userPin.subtitle,
            text: userPin.id
        });
  
        //Add the pushpin to the map
        map.entities.push(pin);

        const nearest = locations.filter(l => l.nearest);
        if (nearest[0]) calculateDirection(directionsManager, userData.pushpin, nearest[0]);
      }
    }
  };
  
  if (!map) {
    let loadMap = setInterval(async () => {
      if (window.Microsoft) {
        window.clearInterval(loadMap);
  
        let center;
        if (userData.pushpin)
          center = new window.Microsoft.Maps.Location(userData.pushpin.latitude, userData.pushpin.longitude);
        else
          center = new window.Microsoft.Maps.Location(43.254406, -79.867308);
        
        map = await new window.Microsoft.Maps.Map('#myMap', {
          credentials: apiKey,
          center: center,
          mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
              zoom: 15
        });
  
        await window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', function() {
          searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
        });
        await window.Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function() {
          directionsManager = new window.Microsoft.Maps.Directions.DirectionsManager(map);
        });

        pushPins();
      }
    }, 1000);

  }

  const getNearestLocation = (pushpin) => {
    getDistance(apiKey, pushpin, locations);

    let calculateDistances = setInterval(() => {
      if (window.locationsWithDistance) {
        window.clearInterval(calculateDistances);

        const nearest = window.locationsWithDistance.reduce(function(res, loc) {
          return (loc.travelDistance < res.travelDistance) ? loc : res;
        });

        const newArray = window.locationsWithDistance.map(loc => {
          if (loc.travelDistance === nearest.travelDistance) loc.nearest = true;
          else loc.nearest = false;
          return loc;
        });
        
        const _userData = { ...userData, pushpin };
        localStorage.setItem('userData', JSON.stringify(_userData));
        setUserData(_userData);

        setLocations(newArray);
        pushPins();
      }
    }, 1000);
  };

  const setAddress = async () => {
    if (!address.current.value) return;
    geocodeQuery(address.current.value, searchManager);
    
    let getNewLocation = setInterval(async function() {
      if (window.newLocation) {
        window.clearInterval(getNewLocation);

        const loc = window.newLocation;
        const myPushPin = {
          id: Math.round(Math.random() * 1000),
          latitude: loc.latitude,
          longitude: loc.longitude,
          description: "You are here",
          subtitle: "My location",
          address: address.current.value
        };
        
        getNearestLocation(myPushPin);
      }
    }, 1000);
  };

  useEffect(() => {
    async function call() {
      const response = await getLocations();
      const locs = await response.json();
      setLocations(locs);
    }
    call();
  }, [setLocations]);

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
            { locations.map(loc => {
              if (loc.nearest) {
                return (<div key={loc.id}>
                    <h4>
                      <strong>Your address:</strong>
                    </h4>
                    <h5>{userData.pushpin.address}</h5>
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
  );
}

export default BingMaps;