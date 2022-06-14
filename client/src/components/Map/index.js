import React from "react";
import { ReactBingmaps } from "react-bingmaps-plus";

function Map(props) {
  let locations = props.locations.map((location) => {
    return { location: location, option: { color: "red" } };
  });

  const apiKey = process.env.REACT_APP_BING_MAPS_API_KEY || process.env.BING_MAPS_API_KEY;

  return (
    <div style={{ height: props.height, width: props.width }}>
      <ReactBingmaps
        bingmapKey = {apiKey}
        center = {props.center}
        mapTypeId = {"aerial"}
        pushPins = {locations}
        getLocation = {{ addHandler: "click", callback:props.onClick }}
      />
    </div>
    );
  }

export default Map;
