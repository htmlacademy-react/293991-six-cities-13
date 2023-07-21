import { ChangeEvent, useState } from 'react';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, RATINGS } from '../../const';
import { Rating } from '../../types/rating';
import ReviewRatingStar from '../review-star/review-star';


function ReviewForm():JSX.Element {
  const [comment, setComment] = useState('');
  const [score, setScore] = useState(0);

  const reviewIsValid = comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH && score > 0;

  const onChangeRatingHandler = (sc: number) => () => setScore(sc);

  function onChangeReviewHandler(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map((rating: Rating) => <ReviewRatingStar key={rating.score} rating={rating} currentScore={score} onChangeRatingHandler={onChangeRatingHandler(rating.score)}/>)}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={onChangeReviewHandler}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!reviewIsValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
