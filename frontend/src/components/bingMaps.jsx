import React, { useContext, useEffect, useRef, useState } from 'react';
import { addLocation, getLocations, deleteLocation } from '../services/httpService';
import { geocodeQuery, getDistance } from '../services/bingMapsService';
import UserContext from './../context/userContext';

function BingMaps(props) {
  const [locations, setLocations] = useState([]);
  const {userData, setUserData} = useContext(UserContext);
  const address = useRef();
  const apiKey = "Aj6-7A0g8ZfYerfMQLQVFt3DvU--RyMpDC8u1g2KV_CFP4plypNxDSWei9wbEpbK";
  const mainAddress = "2 King St W, Hamilton, ON. Postal Code: L8P 1A1";
  let map;

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
  
        //Add the pushpin to the map
        map.entities.push(pin);
        if (loc.description === "You are here") map.setView({ bounds: pin.bestView });
      }
    }
  };
  
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

      pushPins();
      
      window.Microsoft.Maps.loadModule('Microsoft.Maps.Search');
    }
  }, 1000);

  useEffect(() => {
    async function call() {
      const response = await getLocations();
      const locs = await response.json();
      setLocations(locs);
    }
    call();
  }, [setLocations]);

  const getNearestLocation = (_locations) => {
    getDistance(apiKey, _locations);

    let call = setInterval(() => {
      if (window.locationsWithDistance) {
        window.clearInterval(call);
        const nearest = window.locationsWithDistance.reduce(function(res, loc) {
          return (loc.distance < res.distance) ? loc : res;
        });

        for (let loc of window.locationsWithDistance) {
          if (loc.distance === nearest.distance) loc.nearest = true;
        }

        setLocations(window.locationsWithDistance);
        pushPins();
      }
    }, 100);
  };

  const setAddress = async () => {
    if (!address.current.value) return;

    geocodeQuery(address.current.value, map);
    
    let getPin = setInterval(async function() {
      if (window.newLocation) {
        window.clearInterval(getPin);

        if (userData.pushpin) await deleteLocation(userData.pushpin.id);
        const loc = window.newLocation;

        const myPushPin = {
          id: Math.round(Math.random() * 1000),
          latitude: loc.latitude,
          longitude: loc.longitude,
          description: "You are here",
          subtitle: address.current.value
        };        
        
        const uriEncoded = new URLSearchParams(myPushPin);
        await addLocation(uriEncoded.toString());
        
        const _userData = JSON.parse(JSON.stringify(userData));
        _userData.pushpin = myPushPin;
        localStorage.setItem('userData', JSON.stringify(_userData));
        setUserData(_userData);

        const _locations = locations.filter(loc => loc.description !== "You are here");
        _locations.push(myPushPin);
        getNearestLocation(_locations);
      }
    }, 100);
  };

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
                return (<div>
                    <h5>The nearest location to you is:</h5>
                    <h5>{loc.description}</h5>
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