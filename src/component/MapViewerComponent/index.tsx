import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  cloneElement,
} from "react";

type MapProps = google.maps.MapOptions & {
  style: { [key: string]: string };
  children?:
    | React.ReactElement<google.maps.MarkerOptions>[]
    | React.ReactElement<google.maps.MarkerOptions>;
  onMapClick?: (lat: number, lng: number) => void;
};

export const MapViewerComponent: React.FC<MapProps> = ({
  children,
  style,
  onMapClick,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const option = {
        center: options.center,
        zoom: options.zoom || 15,
      };
      const initMap = new window.google.maps.Map(ref.current, option);

      if (onMapClick) {
        initMap.addListener("click", (e) => {
          onMapClick(e.latLng.lat(), e.latLng.lng());
        });
      }

      if (!map) {
        setMap(initMap);
      } else {
        initMap.setOptions(options);
      }
    }
  }, [ref, map, options, onMapClick]);

  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};
