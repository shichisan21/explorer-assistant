import { useEffect, useState } from "react";

export const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [markar, setMarkar] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!markar) {
      setMarkar(new google.maps.Marker({ draggable: true }));
    }

    if (markar) {
      google.maps.event.addListener(markar, "dragend", function (e) {
        console.log("e", e.latLng.lat());
        console.log("e", e.latLng.lng());
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
