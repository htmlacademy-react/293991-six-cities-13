import { ChangeEvent, useState, MouseEvent } from 'react';
import { FormControlToDisplayError, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, RATINGS } from '../../const';
import { Rating } from '../../types/rating';
import ReviewRatingStar from '../review-star/review-star';
import { addCommentAction } from '../../services/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './review-form.module.css';
import { extractErrorMessageForControl } from '../../utils/utils';

function ReviewForm():JSX.Element {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const offerDetail = useAppSelector((state) => state.offerDetail);
  const errorResponse = useAppSelector((state) => state.errorResponse);
  const isOfferCommentSending = useAppSelector((state) => state.isOfferCommentSending);

  const reviewIsValid = comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH && rating > 0;

  const onChangeRatingHandler = (newRating: number) => () => setRating(newRating);

  function onChangeCommentHandler(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  function onSubmitHandler(evt: MouseEvent<HTMLElement>) {
    evt.preventDefault();
    if (offerDetail !== undefined && offerDetail !== null) {
      const offerId = offerDetail.id;
      dispatch(addCommentAction({offerId, comment, rating}));
      setComment('');
      setRating(0);
    }
  }

  const errorForRating = extractErrorMessageForControl(errorResponse, FormControlToDisplayError.RatingControl);
  const errorForComment = extractErrorMessageForControl(errorResponse, FormControlToDisplayError.CommentControl);

  return (
    <form className="reviews__form form">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      {
        errorResponse !== null && errorForRating && <p className={styles.error}>{errorForRating}</p>
      }
      <div className="reviews__rating-form form__rating">
        {RATINGS.map((rt: Rating) => <ReviewRatingStar key={rt.score} rating={rt} currentRating={rating} onChangeRatingHandler={onChangeRatingHandler(rt.score)}/>)}
      </div>
      {
        errorResponse !== null && errorForComment && <p className={styles.error}>{errorForComment}</p>
      }
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={onChangeCommentHandler}
        disabled={isOfferCommentSending}
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
          disabled={!reviewIsValid || isOfferCommentSending}
          onClick={onSubmitHandler}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
