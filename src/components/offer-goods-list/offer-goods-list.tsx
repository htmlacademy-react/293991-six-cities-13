import OfferGood from '../offer-good/offer-good';

type OfferGoodsListProps = {
  goods: string[] | undefined;
}

function OfferGoodsList({goods = []}: OfferGoodsListProps):JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {goods.map((goodItem: string) => (<OfferGood key={goodItem} goodItem={goodItem}/>))}
      </ul>
    </div>
  );
}
export default OfferGoodsList;
