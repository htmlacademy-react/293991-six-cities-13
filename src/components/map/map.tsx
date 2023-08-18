import {useRef, useEffect, memo} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, OfferCardMode} from '../../const';
import 'leaflet/dist/leaflet.css';
import cn from 'classnames';
import { OfferShort } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import { Location } from '../../types/location';
import { getActiveCity, getOffersByCity } from '../../store/offers-process/selectors';
import { getOfferDetail, getOffersNearBy } from '../../store/offer-detail-process/selectors';
import { getHoveredOffer } from '../../store/hovered-offer-process/selectors';

type MapProps = {
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

function Map({mode}: MapProps): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offersByCity = useAppSelector(getOffersByCity);
  const offersNearBy = useAppSelector(getOffersNearBy);
  const offerDetail = useAppSelector(getOfferDetail);
  const hoveredOffer = useAppSelector(getHoveredOffer);
  const mapRef = useRef(null);
  const map = useMap(mapRef, activeCity);

  const currentOffer = mode === OfferCardMode.MainPage ? hoveredOffer : offerDetail;

  let locationsForMap: Location[];
  if (mode === OfferCardMode.MainPage) {
    locationsForMap = offersByCity.map((offer: OfferShort) => offer.location);
  } else {
    if (currentOffer !== null && currentOffer !== undefined) {
      locationsForMap = [...offersNearBy.map((offer: OfferShort) => offer.location), currentOffer.location]
    } else (
      locationsForMap = offersNearBy.map((offer: OfferShort) => offer.location)
    )
  }

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      locationsForMap.forEach((location: Location) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude
        });

        marker
          .setIcon((location.latitude === currentOffer?.location.latitude && location.longitude === currentOffer?.location.longitude) ? currentCustomIcon : defaultCustomIcon)
          .addTo(markerLayer);
      });

      map.setView([activeCity.location.latitude, activeCity.location.longitude]);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, locationsForMap, currentOffer?.id, activeCity]);

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
