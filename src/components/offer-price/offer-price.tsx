import { TOfferDetail } from '../../types/offer';

type TOfferPriceProps = {
  offerDetail: TOfferDetail;
}

function OfferPrice({offerDetail}: TOfferPriceProps):JSX.Element {
  return (
    <div className="offer__price">
      <b className="offer__price-value">€{offerDetail.price}</b>
      <span className="offer__price-text">&nbsp;night</span>
    </div>
  );
}

export default OfferPrice;
