import { memo } from 'react';
import { capitalizeFirstLetter } from '../../utils/utils';

type OfferFeaturesProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
}

function _OfferFeatures({type = '', bedrooms = 0, maxAdults = 0}: OfferFeaturesProps): JSX.Element {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(type)}</li>
      <li className="offer__feature offer__feature--bedrooms">
        {bedrooms} Bedrooms
      </li>
      <li className="offer__feature offer__feature--adults">
        Max {maxAdults} adults
      </li>
    </ul>
  );
}

const OfferFeatures = memo(_OfferFeatures);
export default OfferFeatures;
