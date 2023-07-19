import { OfferDetail } from "../../types/offer";

type OfferPriceProps = {
  offerDetail: OfferDetail;
}

function OfferPrice({offerDetail}: OfferPriceProps):JSX.Element {
  return (
    <div className="offer__price">
      <b className="offer__price-value">€{offerDetail.price}</b>
      <span className="offer__price-text">&nbsp;night</span>
    </div>
  )
}

export default OfferPrice;
