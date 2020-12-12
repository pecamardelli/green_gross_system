import React from "react";
import { Map as LeafletMap, Marker, Popup, TileLayer } from "react-leaflet";

// GET ONE in https://docs.mapbox.com/help/how-mapbox-works/access-tokens/";
const ACCESS_TOKEN = "Aj6-7A0g8ZfYerfMQLQVFt3DvU--RyMpDC8u1g2KV_CFP4plypNxDSWei9wbEpbK";

const URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${ACCESS_TOKEN}`;
const ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const TOWER_LOCATION = [43.385807, -8.406524];

const MyMap = () => (
  <LeafletMap center={TOWER_LOCATION} zoom={16}>
    <TileLayer url={URL} attribution={ATTRIBUTION} />
    <Marker position={TOWER_LOCATION}>
      <Popup>
        <b>Tower of Hercules</b>
        <br />
        UNESCO World Heritage site
      </Popup>
    </Marker>
  </LeafletMap>
);

export default MyMap;