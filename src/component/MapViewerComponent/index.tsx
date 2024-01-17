import React from "react";
import { Map, GoogleApiWrapper, Marker, GoogleAPI } from "google-maps-react";
import googleMapReact from "google-map-react";

export const useMap = ({ defaultPosition }: Props) => {
  // googleMapsApiKeyは自分で取得したものに差し替えてください
  const { isLoaded } = useJsApiLoader({
    id: "google-map",
    googleMapsApiKey,
  });

  const onLoad = (map: Map) => {
    const bounds = new window.google.maps.LatLngBounds(defaultPosition);
    map.fitBounds(bounds);
  };

  const onUnmount = useCallback(() => {}, []);

  return { isLoaded, onLoad, onUnmount };
};

const MapViewerComponent = (props: GoogleAPI) => {
  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={{ lat: 34.241600036621094, lng: 132.5554656982422 }}
    >
      {/* このコードでは、Map コンポーネントに直接 Marker を子要素として追加していません */}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "YOUR_API_KEY_HERE",
})(MapViewerComponent);
