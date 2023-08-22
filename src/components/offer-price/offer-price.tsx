import { memo } from 'react';

type OfferPriceProps = {
  price: number | undefined;
}

function _OfferPrice({price = 0}: OfferPriceProps):JSX.Element {
  return (
    <div className="offer__price">
      <b className="offer__price-value">€{price}</b>
      <span className="offer__price-text">&nbsp;night</span>
    </div>
  );
}

const OfferPrice = memo(_OfferPrice);
export default OfferPrice;
