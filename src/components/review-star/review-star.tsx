import { Rating } from '../../types/rating';

type ReviewRatingStarProps = {
  rating: Rating;
  currentRating: number;
  onChangeRatingHandler: () => void;
}

function ReviewRatingStar({rating, currentRating, onChangeRatingHandler}: ReviewRatingStarProps): JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={rating.score}
        id={`${rating.score}-stars`}
        type="radio"
        checked={rating.score === currentRating}
        onChange={onChangeRatingHandler}
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

export default ReviewRatingStar;
