import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, OfferCardMode} from '../../const';
import 'leaflet/dist/leaflet.css';
import cn from 'classnames';
import { OfferShort } from '../../types/offer';

type MapProps = {
  offersShort: OfferShort[];
  currentOfferId: string | undefined;
  mode: OfferCardMode;
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

function Map({offersShort, currentOfferId, mode}: MapProps): JSX.Element {
  const currentOffer = offersShort.find((offer: OfferShort) => offer.id === currentOfferId) as OfferShort;

  const mapRef = useRef(null);
  const map = useMap(mapRef, currentOffer);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offersShort.forEach((offer: OfferShort) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            currentOffer !== undefined && offer.id === currentOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offersShort, currentOffer]);

  return (
    <section
      className={cn(
        'map',
        {'cities__map': mode === OfferCardMode.MainPage},
        {'offer__map': mode === OfferCardMode.NearPlaces}
      )}

      ref={mapRef}
    />
  );
}
export default Map;
