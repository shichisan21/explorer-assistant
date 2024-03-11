import { useEffect, useState } from "react";

interface MarkerProps extends google.maps.MarkerOptions {
  setPosition: (lat: number, lng: number) => void;
}

export const Marker: React.FC<MarkerProps> = ({ setPosition, ...options }) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker({ draggable: true }));
    }

    if (marker) {
      google.maps.event.addListener(marker, "dragend", function (e) {
        console.log("e", e.latLng.lat(), e.latLng.lng());
        setPosition(e.latLng.lat(), e.latLng.lng());
      });
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};
