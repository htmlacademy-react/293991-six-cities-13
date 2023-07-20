import { TComment } from '../../types/offer-review';
import OfferReviewComment from '../offer-review-comment/offer-review-comment';
import ReviewForm from '../review-form/review-form';

type TOfferReviewProps = {
  comments: TComment[];
}

function OfferReview({comments}: TOfferReviewProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((comment: TComment) => <OfferReviewComment key={comment.id} comment={comment}/>)}
      </ul>
      <ReviewForm/>
    </section>
  );
}

export default OfferReview;
