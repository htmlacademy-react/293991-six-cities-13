type TInsideItemProps = {
  goodItem: string;
}

function OfferGood({goodItem}: TInsideItemProps): JSX.Element {
  return (
    <li className="offer__inside-item">{goodItem}</li>
  );
}

export default OfferGood;
