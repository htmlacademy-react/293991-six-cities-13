import { OfferDetail } from '../../types/offer';
import { convertRatingToWidthPerc } from '../../utils/utils';

type OfferRatingProps = {
  offerDetail: OfferDetail;
}

function OfferRating({offerDetail}: OfferRatingProps): JSX.Element {
  return (
    <div className="offer__rating rating">
      <div className="offer__stars rating__stars">
        <span style={{ width: convertRatingToWidthPerc(offerDetail.rating) }} />
        <span className="visually-hidden">Rating</span>
      </div>
      <span className="offer__rating-value rating__value">{offerDetail.rating}</span>
    </div>
  );
}

export default OfferRating;
