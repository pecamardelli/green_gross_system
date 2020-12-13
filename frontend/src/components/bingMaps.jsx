import React, { useEffect, useState } from 'react';
import httpService from '../../src/services/httpService';

function BingMaps(props) {
  const [locations, setLocations] = useState([]);
  const apiKey = "Aj6-7A0g8ZfYerfMQLQVFt3DvU--RyMpDC8u1g2KV_CFP4plypNxDSWei9wbEpbK";
  const mainAddress = "2 King St W, Hamilton, ON. Postal Code: L8P 1A1";

  let load = setInterval(async () => {
    if (window.Microsoft) {
      const map = await new window.Microsoft.Maps.Map('#myMap', {
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
      window.clearInterval(load);
    }
  }, 1000);

  useEffect(() => {
    async function call() {
      const response = await httpService.getLocations();
      const locs = await response.json();
      setLocations(locs);
    }
    
    call();
  }, [setLocations]);

  return (
    <div className="card-transparent bing-maps text-white">
      <div className="card-body row">
        <div className="col-sm-6" id="myMap"></div>
        <div className="col-sm-6">
          <h4>Please, enter your address.</h4>
          <input className="form-control" type="text" placeholder={mainAddress}/>
        </div>
      </div>
    </div>
  );
}

export default BingMaps;