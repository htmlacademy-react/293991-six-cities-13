import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { Rating } from '../../types/rating';
import { getIsOfferCommentSending } from '../../store/offer-detail-process/selectors';

type ReviewRatingStarProps = {
  rating: Rating;
  currentRating: number;
  onRatingChange: () => void;
}

function _ReviewRatingStar({rating, currentRating, onRatingChange}: ReviewRatingStarProps): JSX.Element {
  const isOfferCommentSending = useAppSelector(getIsOfferCommentSending);

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={rating.score}
        id={`${rating.score}-stars`}
        type="radio"
        checked={rating.score === currentRating}
        onChange={onRatingChange}
        disabled={isOfferCommentSending}
      />
      <label
        htmlFor={`${rating.score}-stars`}
        className="reviews__rating-label form__rating-label"
        title={rating.label}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}

const ReviewRatingStar = memo(_ReviewRatingStar);
export default ReviewRatingStar;
