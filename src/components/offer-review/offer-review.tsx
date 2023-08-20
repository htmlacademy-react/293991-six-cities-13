import { memo, useMemo } from 'react';
import { AuthorizationStatus, MAX_COMMENTS_IN_REVIEW } from '../../const';
import { useAppSelector } from '../../hooks';
import { Comment } from '../../types/offer-review';
import OfferReviewComment from '../offer-review-comment/offer-review-comment';
import ReviewForm from '../review-form/review-form';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getOfferComments, getOfferDetail } from '../../store/offer-detail-process/selectors';
import { differenceInSeconds } from 'date-fns';
import { OfferDetail } from '../../types/offer';

function OfferReview(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const allComments = useAppSelector(getOfferComments);
  const offerDetail = useAppSelector(getOfferDetail) as OfferDetail;
  const comments = useMemo(() => [...allComments].sort((a: Comment, b: Comment) => differenceInSeconds(new Date(b.date), new Date(a.date))).slice(0, MAX_COMMENTS_IN_REVIEW), [offerDetail.id, allComments.length])

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      {
        comments.length > 0 &&
        <ul className="reviews__list">
          {comments.map((comment: Comment) => <OfferReviewComment key={comment.id} comment={comment}/>)}
        </ul>
      }
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
    </section>
  );
}

export default memo(OfferReview);
