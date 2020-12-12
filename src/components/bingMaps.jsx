import React, { useEffect } from 'react';

function BingMaps(props) {
  const apiKey = "Aj6-7A0g8ZfYerfMQLQVFt3DvU--RyMpDC8u1g2KV_CFP4plypNxDSWei9wbEpbK";
  
  useEffect(() => {
    const load = setInterval(() => {
      if (window.Microsoft) {
        new window.Microsoft.Maps.Map('#myMap', {
        credentials: apiKey,
        center: new window.Microsoft.Maps.Location(51.50632, -0.12714),
        mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
            zoom: 10
        });
      }
      if (window.Microsoft) window.clearInterval(load);
    }, 1000);
    
  });

  return (
    <div className="card-transparent bing-maps">
      <div className="card-body">
        <div id="myMap"></div>
      </div>
    </div>
  );
}

export default BingMaps;