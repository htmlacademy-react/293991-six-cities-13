import { OfferCardMode } from '../../const';
import { useAppSelector } from '../../hooks';
import { City } from '../../types/city';
import { OfferShort } from '../../types/offer';
import { sortOffers } from '../../utils/utils';
import OfferCard from '../offer-card/offer-card';
import OffersSorting from '../offers-sorting/offers-sorting';

type OfferslistProps = {
  offersShort: OfferShort[];
  activeCity: City;
  onMouseEnterHandler: (offerId: string) => () => void;
  onMouseLeaveHandler: () => void;
}

function OffersList({offersShort, activeCity, onMouseEnterHandler, onMouseLeaveHandler}: OfferslistProps): JSX.Element {
  const sortType = useAppSelector((state) => state.sortType);
  const sortedOffersShort = sortOffers<OfferShort>(offersShort, sortType);

  return (
    <>
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offersShort.length} {offersShort.length === 1 ? 'place' : 'places'} to stay in {activeCity.name}</b>
      <OffersSorting/>
      <div className="cities__places-list places__list tabs__content">
        {sortedOffersShort.map((offerShort: OfferShort) => (<OfferCard key={offerShort.id} offerShort={offerShort} mode={OfferCardMode.MainPage} onMouseEnterHandler={onMouseEnterHandler(offerShort.id)} onMouseLeaveHandler={onMouseLeaveHandler}/>))}
      </div>
    </>
  );
}

export default OffersList;
