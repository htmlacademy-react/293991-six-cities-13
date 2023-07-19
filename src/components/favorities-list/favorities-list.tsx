import { OfferShort } from "../../types/offer";
import FavoriteOfferCard from "../favorite-offer-card/favorite-offer-card";
import FavoriteLocationCity from "../favorities-location-city/favorities-location-city";

type FavoritiesListProps = {
  city: string;
  offersFavorities: OfferShort[];
}

function FavoritiesList({city, offersFavorities}: FavoritiesListProps):JSX.Element {
  const offers = offersFavorities.filter((offer: OfferShort) => offer.city.name === city)

  return (
    <li className="favorites__locations-items">
      <FavoriteLocationCity city={city}/>
      <div className="favorites__places">
        {offers.map((offer: OfferShort) => <FavoriteOfferCard key={offer.id} offer={offer}/>)}
      </div>
    </li>
  )
}

export default FavoritiesList;
