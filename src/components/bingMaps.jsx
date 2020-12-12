import React, { useEffect } from 'react';

function BingMaps(props) {
  const apiKey = "Aj6-7A0g8ZfYerfMQLQVFt3DvU--RyMpDC8u1g2KV_CFP4plypNxDSWei9wbEpbK";
  let map;
  
  useEffect(() => {
    const load = setInterval(() => {
      if (window.Microsoft) {
        map = new window.Microsoft.Maps.Map('#myMap', {
        credentials: apiKey,
        center: new window.Microsoft.Maps.Location(43.254406, -79.867308),
        mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
            zoom: 15
        });

        const center = map.getCenter();

        //Create custom Pushpin
        const pin = new window.Microsoft.Maps.Pushpin(center, {
            title: 'Green Gross',
            subTitle: 'Main Branch',
            text: '1'
        });

        //Add the pushpin to the map
        map.entities.push(pin);
      }
      if (window.Microsoft) window.clearInterval(load);
    }, 1000);
  });

  return (
    <div className="card-transparent bing-maps text-white">
      <div className="card-body row">
        <div className="col-sm-6" id="myMap"></div>
        <div className="col-sm-6">
          <h4>Please, enter your address.</h4>
          <input className="form-control" type="text" />
        </div>
      </div>
    </div>
  );
}

export default BingMaps;