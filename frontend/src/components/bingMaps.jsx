import React, { useContext, useEffect, useRef, useState } from 'react';
import { getLocations } from '../../src/services/httpService';
import { getCoords } from '../services/bingMapsService';
import UserContext from './../context/userContext';

function BingMaps(props) {
  const [locations, setLocations] = useState([]);
  const {userData, setUserData} = useContext(UserContext);
  const address = useRef();
  const apiKey = "Aj6-7A0g8ZfYerfMQLQVFt3DvU--RyMpDC8u1g2KV_CFP4plypNxDSWei9wbEpbK";
  const mainAddress = "2 King St W, Hamilton, ON. Postal Code: L8P 1A1";
  let map;
  let searchManager;

  let load = setInterval(async () => {
    if (window.Microsoft) {
      map = await new window.Microsoft.Maps.Map('#myMap', {
        credentials: apiKey,
        center: new window.Microsoft.Maps.Location(43.254406, -79.867308),
        mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
            zoom: 15
      });

      for (let loc of locations) {
        //Create custom Pushpins
        const coords = new window.Microsoft.Maps.Location(loc.latitude, loc.longitude);
        const pin = new window.Microsoft.Maps.Pushpin(coords, {
            title: loc.description,
            subTitle: 'Main Branch',
            text: '1'
        });

        //Add the pushpin to the map
        map.entities.push(pin);
      }
      window.Microsoft.Maps.loadModule('Microsoft.Maps.Search');
      window.clearInterval(load);
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

  const setAddress = async () => {
    const coords = await getCoords(address.current.value, map);
    console.log(coords);

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
        </div>
      </div>
    </div>
  );
}

export default BingMaps;