import {useRef, useEffect, memo} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, OfferCardMode} from '../../const';
import 'leaflet/dist/leaflet.css';
import cn from 'classnames';
import { OfferDetail, OfferShort } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import { Location } from '../../types/location';

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
  const activeCity = useAppSelector((state) => state.activeCity);
  const offersByCity = useAppSelector((state) => state.offersByCity);
  const offersNearBy = useAppSelector((state) => state.offersNearBy);
  const offerDetail = useAppSelector((state) => state.offerDetail);
  const hoveredOffer = useAppSelector((state) => state.hoveredOffer);
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
