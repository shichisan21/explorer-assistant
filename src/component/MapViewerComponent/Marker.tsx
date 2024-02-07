import { useEffect, useState } from "react";

interface MarkerProps extends google.maps.MarkerOptions {
  setPosition: (lat: number, lng: number) => void;
}

export const Marker: React.FC<MarkerProps> = (options, setPosition) => {
  const [markar, setMarkar] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!markar) {
      setMarkar(new google.maps.Marker({ draggable: true }));
    }

    if (markar) {
      google.maps.event.addListener(markar, "dragend", function (e) {
        console.log("e", e.latLng.lat());
        console.log("e", e.latLng.lng());
        setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      });
    }

    return () => {
      if (markar) {
        markar.setMap(null);
      }
    };
  }, [markar]);

  useEffect(() => {
    if (markar) {
      markar.setOptions(options);
    }
  }, [markar, options]);

  return null;
};
