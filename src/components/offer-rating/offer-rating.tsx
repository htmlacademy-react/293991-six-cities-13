import { memo } from 'react';
import { convertRatingToWidthPerc } from '../../utils/utils';

type OfferRatingProps = {
  rating: number;
}

function OfferRating({rating = 0}: OfferRatingProps): JSX.Element {
  return (
    <div className="offer__rating rating">
      <div className="offer__stars rating__stars">
        <span style={{ width: convertRatingToWidthPerc(rating) }} />
        <span className="visually-hidden">Rating</span>
      </div>
      <span className="offer__rating-value rating__value">{rating}</span>
    </div>
  );
}

export default memo(OfferRating);
