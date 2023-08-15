import { OfferShort } from '../../types/offer';
import FavoriteOfferCard from '../favorite-offer-card/favorite-offer-card';
import FavoriteLocationCity from '../favorities-location-city/favorities-location-city';

type FavoritiesListProps = {
  offers: OfferShort[];
}

function FavoritiesList({offers}: FavoritiesListProps):JSX.Element {
  return (
    <li className="favorites__locations-items">
      { offers.length > 0 && <FavoriteLocationCity city={offers[0].city}/>}
      <div className="favorites__places">
        {offers.map((offer: OfferShort) => <FavoriteOfferCard key={offer.id} offer={offer}/>)}
      </div>
    </li>
  );
}

export default FavoritiesList;
