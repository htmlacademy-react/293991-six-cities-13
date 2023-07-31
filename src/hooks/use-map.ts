import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import { City } from '../types/city';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  activeCity: City | undefined
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current && activeCity !== undefined) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: activeCity.location.latitude,
          lng: activeCity.location.longitude
        },
        zoom: activeCity.location.zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, activeCity]);

  return map;
}

export default useMap;
