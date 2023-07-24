import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';
import cn from 'classnames';
import { OfferShort } from '../../types/offer';

type MapProps = {
  offersShort: OfferShort[];
  currentOfferId: string | undefined;
  specialStyle: string;
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

function Map({offersShort, currentOfferId, specialStyle}: MapProps): JSX.Element {
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
  }, [map, offersShort, currentOfferId]);

  return (
    <section 
      className={cn("map", specialStyle)} 
      style={{height: '750px', width: '512px'}}
      ref={mapRef}
    />
  );
}

export default Map;
