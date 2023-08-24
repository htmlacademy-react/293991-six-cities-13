import { memo } from 'react';
import { capitalizeFirstLetter } from '../../utils/utils';

type OfferFeaturesProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
}

function _OfferFeatures({type, bedrooms, maxAdults}: OfferFeaturesProps): JSX.Element {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(type)}</li>
      <li className="offer__feature offer__feature--bedrooms">
        {bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
      </li>
      <li className="offer__feature offer__feature--adults">
        Max {maxAdults} {maxAdults === 1 ? 'adult' : 'adults'}
      </li>
    </ul>
  );
}

const OfferFeatures = memo(_OfferFeatures);
export default OfferFeatures;
