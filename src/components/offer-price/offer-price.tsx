type OfferPriceProps = {
  price: number | undefined;
}

function OfferPrice({price = 0}: OfferPriceProps):JSX.Element {
  return (
    <div className="offer__price">
      <b className="offer__price-value">€{price}</b>
      <span className="offer__price-text">&nbsp;night</span>
    </div>
  );
}

export default OfferPrice;
