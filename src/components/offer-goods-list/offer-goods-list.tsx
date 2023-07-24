import { OfferDetail } from '../../types/offer';
import OfferGood from '../offer-good/offer-good';

type OfferGoodsListProps = {
  offerDetail: OfferDetail;
}

function OfferGoodsList({offerDetail}: OfferGoodsListProps):JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {offerDetail.goods.map((goodItem: string) => (<OfferGood key={goodItem} goodItem={goodItem}/>))}
      </ul>
    </div>
  );
}
export default OfferGoodsList;
