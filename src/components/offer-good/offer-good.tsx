type InsideItemProps = {
  goodItem: string;
}

function OfferGood({goodItem}: InsideItemProps): JSX.Element {
  return (
    <li className="offer__inside-item">{goodItem}</li>
  );
}

export default OfferGood;
