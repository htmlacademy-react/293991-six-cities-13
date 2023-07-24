import { OfferDetail } from '../../types/offer';
import { capitalizeFirstLetter } from '../../utils/utils';

type OfferFeaturesProps = {
  offerDetail: OfferDetail;
}

function OfferFeatures({offerDetail}: OfferFeaturesProps): JSX.Element {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(offerDetail.type)}</li>
      <li className="offer__feature offer__feature--bedrooms">
        {offerDetail.bedrooms} Bedrooms
      </li>
      <li className="offer__feature offer__feature--adults">
        Max {offerDetail.maxAdults} adults
      </li>
    </ul>
  );
}

export default OfferFeatures;
