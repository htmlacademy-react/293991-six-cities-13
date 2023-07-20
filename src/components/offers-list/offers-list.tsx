import { TOfferShort } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import { useState } from 'react';

type TOffersListProps = {
  offersShort: TOfferShort[];
}

function OffersList({offersShort}: TOffersListProps): JSX.Element {
  const [offerListState, setCurrentOfferId] = useState({});

  const onMouseEnterHandler = (offerId: string) => () => setCurrentOfferId({...offerListState, currentOfferId: offerId});

  return (
    <>
      {offersShort.map((offerShort: TOfferShort) => (<OfferCard key={offerShort.id} offerShort={offerShort} onMouseEnterHandler={onMouseEnterHandler(offerShort.id)}/>))}
    </>
  );
}

export default OffersList;
