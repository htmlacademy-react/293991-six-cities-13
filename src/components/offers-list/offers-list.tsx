import { OfferShort } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import { useState } from 'react';

type OffersListProps = {
  offersShort: OfferShort[];
}

function OffersList({offersShort}: OffersListProps): JSX.Element {
  const [offerListState, setCurrentOfferId] = useState({});

  const onMouseEnterHandler = (offerId: string) => () => setCurrentOfferId({...offerListState, currentOfferId: offerId});

  return (
    <>
      {offersShort.map((offerShort: OfferShort) => (<OfferCard key={offerShort.id} offerShort={offerShort} onMouseEnterHandler={onMouseEnterHandler(offerShort.id)}/>))}
    </>
  );
}

export default OffersList;
