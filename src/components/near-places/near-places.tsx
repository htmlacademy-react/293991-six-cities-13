import { useState } from "react";
import { OfferCardMode } from "../../const";
import { OfferShort } from "../../types/offer";
import { getNearOffers } from "../../utils/utils";
import OfferCard from "../offer-card/offer-card";

function NearPlaces(): JSX.Element {
  const nearOffers = getNearOffers();

  const [currentOfferId, setCurrentOfferId] = useState<string>(nearOffers[0].id);

  const onMouseEnterHandler = (offerId: string) => () => setCurrentOfferId(offerId);

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">
          Other places in the neighbourhood
        </h2>
        <div className="near-places__list places__list">
          {nearOffers.map((offerShort: OfferShort) => (<OfferCard key={offerShort.id} offerShort={offerShort} mode={OfferCardMode.NearPlaces} onMouseEnterHandler={onMouseEnterHandler(offerShort.id)}/>))}
        </div>
      </section>
    </div>
  );
}

export default NearPlaces;
