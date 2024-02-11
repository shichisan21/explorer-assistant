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
    console.log("OPTIONS", children, options);
    if (ref.current) {
      // map が既に存在する場合は新たに作成しない
      const initMap =
        map ||
        new window.google.maps.Map(ref.current, {
          center: options.center,
          zoom: options.zoom || 15,
        });

      initMap.setOptions(options); // マップオプションを更新

      if (onMapClick) {
        window.google.maps.event.clearListeners(initMap, "click"); // 既存のリスナーをクリア
        initMap.addListener("click", (e) => {
          map?.panTo({ lat: e.latLng.lat(), lng: e.latLng.lng() });
          // onMapClick(e.latLng.lat(), e.latLng.lng());
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
