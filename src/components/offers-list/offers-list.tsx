import { memo, useCallback } from 'react';
import { OfferCardMode } from '../../const';
import { useAppSelector } from '../../hooks';
import { OfferShort } from '../../types/offer';
import { sortOffers } from '../../utils/utils';
import OfferCard from '../offer-card/offer-card';
import OffersSorting from '../offers-sorting/offers-sorting';

type OffersListProps = {
  onMouseHoverHandler: (offerId: string) => void;
}

function OffersList({onMouseHoverHandler}: OffersListProps): JSX.Element {
  const activeCity = useAppSelector((state) => state.activeCity);
  const offersByCity = useAppSelector((state) => state.offersByCity);
  const sortType = useAppSelector((state) => state.sortType);
  const sortedOffersShort = sortOffers<OfferShort>(offersByCity, sortType);
  return (
    <>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offersByCity.length} {offersByCity.length === 1 ? 'place' : 'places'} to stay in {activeCity.name}</b>
      <OffersSorting/>
      <div className="cities__places-list places__list tabs__content">
        {sortedOffersShort.map((offerShort: OfferShort) => (<OfferCard key={offerShort.id} offerShort={offerShort} mode={OfferCardMode.MainPage} onMouseHoverHandler={onMouseHoverHandler}/>))}
      </div>
    </>
  );
}

export default memo(OffersList);
