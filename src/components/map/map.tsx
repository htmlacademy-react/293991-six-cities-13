import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {OfferCardMode} from '../../const';
import 'leaflet/dist/leaflet.css';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { Location } from '../../types/location';
import { getOfferDetail } from '../../store/offer-detail-process/selectors';
import { getHoveredOffer } from '../../store/hovered-offer-process/selectors';
import { getActiveCity } from '../../store/offers-process/selectors';

type MapProps = {
  mode: OfferCardMode;
  locations: Location[];
};

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});


function Map({mode, locations}: MapProps): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offerDetail = useAppSelector(getOfferDetail);
  const hoveredOffer = useAppSelector(getHoveredOffer);
  const mapRef = useRef(null);
  const map = useMap(mapRef, activeCity);

  const currentOffer = mode === OfferCardMode.MainPage ? hoveredOffer : offerDetail;

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      locations.forEach((location: Location) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude
        });

        if (location.latitude === currentOffer?.location.latitude && location.longitude === currentOffer?.location.longitude) {
          marker.options.interactive = false;
        }

        marker
          .setIcon((location.latitude === currentOffer?.location.latitude && location.longitude === currentOffer?.location.longitude) ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      });

      map.setView([activeCity.location.latitude, activeCity.location.longitude]);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, locations, currentOffer?.id, currentOffer?.location.latitude, currentOffer?.location.longitude, activeCity]);

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
