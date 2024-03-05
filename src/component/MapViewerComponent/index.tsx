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
  console.log("OPTIONS", children, options);

  useEffect(() => {
    console.log("OPTIONS", children, options);
    if (ref.current) {
      // map が既に存在する場合は新たに作成しない
      const initMap =
        map ||
        new window.google.maps.Map(ref.current, {
          center: options.center,
          zoom: options.zoom || 12,
        });

      initMap.setOptions(options); // マップオプションを更新

      if (onMapClick) {
        window.google.maps.event.clearListeners(initMap, "click"); // 既存のリスナーをクリア
        initMap.addListener("click", (e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          onMapClick(lat, lng);
          map?.panTo({ lat, lng });
          console.log(`Map clicked at lat: ${lat}, lng: ${lng}`);
        });
      }

      if (!map) {
        setMap(initMap);
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
