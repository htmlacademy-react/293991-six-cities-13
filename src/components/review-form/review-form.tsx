import { ChangeEvent, useState, MouseEvent, memo, useCallback } from 'react';
import { FormControlToDisplayError, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, RATINGS } from '../../const';
import { Rating } from '../../types/rating';
import ReviewRatingStar from '../review-star/review-star';
import { addCommentAction } from '../../services/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import styles from './review-form.module.css';
import { extractErrorMessageForControl } from '../../utils/utils';
import { getIsOfferCommentSending, getOfferDetail } from '../../store/offer-detail-process/selectors';
import { getErrorResponse } from '../../store/response-error-process/selectors';

function ReviewForm():JSX.Element {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const offerDetail = useAppSelector(getOfferDetail);
  const errorResponse = useAppSelector(getErrorResponse);
  const isOfferCommentSending = useAppSelector(getIsOfferCommentSending);

  const reviewIsValid = comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH && rating > 0;

  const handleRatingChange = (newRating: number) => setRating(newRating);

  function handleCommentChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  function handleFormSubmit(evt: MouseEvent<HTMLElement>) {
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
        {RATINGS.map((rt: Rating) => <ReviewRatingStar key={rt.score} rating={rt} currentRating={rating} onRatingChange={useCallback(() => handleRatingChange(rt.score), [rt.score])}/>)}
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
        onChange={handleCommentChange}
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
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default memo(ReviewForm);
