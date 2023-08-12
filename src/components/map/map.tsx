import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, OfferCardMode} from '../../const';
import 'leaflet/dist/leaflet.css';
import cn from 'classnames';
import { OfferShort } from '../../types/offer';
import { useAppSelector } from '../../hooks';

type MapProps = {
  offersShort: OfferShort[];
  mode: OfferCardMode;
  currentOfferId: string | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({offersShort, mode, currentOfferId}: MapProps): JSX.Element {
  const activeCity = useAppSelector((state) => state.activeCity);
  const mapRef = useRef(null);
  const map = useMap(mapRef, activeCity);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offersShort.forEach((offer: OfferShort) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(offer.id === currentOfferId ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      });

      map.setView([activeCity.location.latitude, activeCity.location.longitude]);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offersShort, currentOfferId, activeCity]);

  return (
    <section
      className={cn(
        'map',
        {'cities__map': mode === OfferCardMode.MainPage},
        {'offer__map': mode === OfferCardMode.NearPlaces}
      )}
      ref={mapRef}
      style={{
        height: '100%',
        minHeight: '500px',
        width: '100%',
        maxWidth: '1144px',
        margin: '0 auto'
      }}
    />
  );
}
export default Map;
