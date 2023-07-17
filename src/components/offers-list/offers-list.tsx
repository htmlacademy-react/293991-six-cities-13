import { OfferShort } from "../../types/offer";
import OfferCard from "../offer-card/offer-card";

type OffersListProps = {
  offersShort: OfferShort[];
}

function OffersList({offersShort}: OffersListProps): JSX.Element {
  return (
    <>
      {offersShort.map((offerShort: OfferShort) => (<OfferCard key={offerShort.id} offerShort={offerShort}/>))}
    </>
  );
}

export default OffersList;
