const apiKey = "Aj6-7A0g8ZfYerfMQLQVFt3DvU--RyMpDC8u1g2KV_CFP4plypNxDSWei9wbEpbK";

function getScript() {
    return fetch(`https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=${apiKey}`);
}

export default { getScript };
// https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=Aj6-7A0g8ZfYerfMQLQVFt3DvU--RyMpDC8u1g2KV_CFP4plypNxDSWei9wbEpbK