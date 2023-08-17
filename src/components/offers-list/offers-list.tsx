import { memo, useMemo } from 'react';
import { OfferCardMode } from '../../const';
import { useAppSelector } from '../../hooks';
import { OfferShort } from '../../types/offer';
import { sortOffers } from '../../utils/utils';
import OfferCard from '../offer-card/offer-card';
import OffersSorting from '../offers-sorting/offers-sorting';

function OffersList(): JSX.Element {
  const activeCity = useAppSelector((state) => state.activeCity);
  const offersByCity = useAppSelector((state) => state.offersByCity);
  const sortType = useAppSelector((state) => state.sortType);
  const favoritesCount = useAppSelector((state) => state.favoritesCount);
  const sortedOffersShort = useMemo(() => sortOffers<OfferShort>(offersByCity, sortType), [activeCity, sortType, favoritesCount]);

  return (
    <>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offersByCity.length} {offersByCity.length === 1 ? 'place' : 'places'} to stay in {activeCity.name}</b>
      <OffersSorting/>
      <div className="cities__places-list places__list tabs__content">
        {sortedOffersShort.map((offerShort: OfferShort) => <OfferCard key={offerShort.id} offer={offerShort} mode={OfferCardMode.MainPage}/>)}
      </div>
    </>
  );
}

export default memo(OffersList);
