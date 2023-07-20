import { TOfferShort } from '../../types/offer';
import FavoriteOfferCard from '../favorite-offer-card/favorite-offer-card';
import FavoriteLocationCity from '../favorities-location-city/favorities-location-city';

type TFavoritiesListProps = {
  city: string;
  offersFavorities: TOfferShort[];
}

function FavoritiesList({city, offersFavorities}: TFavoritiesListProps):JSX.Element {
  const offers = offersFavorities.filter((offer: TOfferShort) => offer.city.name === city);

  return (
    <li className="favorites__locations-items">
      <FavoriteLocationCity city={city}/>
      <div className="favorites__places">
        {offers.map((offer: TOfferShort) => <FavoriteOfferCard key={offer.id} offer={offer}/>)}
      </div>
    </li>
  );
}

export default FavoritiesList;
