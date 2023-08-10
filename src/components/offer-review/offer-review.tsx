import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { Comment } from '../../types/offer-review';
import OfferReviewComment from '../offer-review-comment/offer-review-comment';
import ReviewForm from '../review-form/review-form';

type OfferReviewProps = {
  comments: Comment[];
}

function OfferReview({comments}: OfferReviewProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

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

export default OfferReview;
