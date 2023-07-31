import { useAppSelector } from '../../hooks';
import { OfferShort } from '../../types/offer';
import { groupOffersByCity } from '../../utils/utils';
import OfferCard from '../offer-card/offer-card';
import { useState } from 'react';

function OffersList(): JSX.Element {
  const activeCity = useAppSelector((state) => state.activeCity);
  const allOffersShot = useAppSelector((state) => state.offers);
  const [offerListState, setCurrentOfferId] = useState({});

  const onMouseEnterHandler = (offerId: string) => () => setCurrentOfferId({...offerListState, currentOfferId: offerId});

  const offersShort = groupOffersByCity<OfferShort>(allOffersShot)[activeCity] || [];

  return (
    <>
      {offersShort.map((offerShort: OfferShort) => (<OfferCard key={offerShort.id} offerShort={offerShort} onMouseEnterHandler={onMouseEnterHandler(offerShort.id)}/>))}
    </>
  );
}

export default OffersList;
