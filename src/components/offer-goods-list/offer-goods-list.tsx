import { memo } from 'react';

type OfferGoodsListProps = {
  goods: string[];
}

function OfferGoodsList({goods = []}: OfferGoodsListProps):JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {goods.map((goodItem: string) => (<li key={goodItem} className="offer__inside-item">{goodItem}</li>))}
      </ul>
    </div>
  );
}
export default memo(OfferGoodsList);
