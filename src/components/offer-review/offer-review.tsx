import { Comment } from '../../types/offer-review';
import OfferReviewComment from '../offer-review-comment/offer-review-comment';
import ReviewForm from '../review-form/review-form';

type OfferReviewProps = {
  comments: Comment[];
}

function OfferReview({comments}: OfferReviewProps): JSX.Element {
  // Формальный PR. Компонент добавлен в предыдущий коммитах. Пункт 1.
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((comment: Comment) => <OfferReviewComment key={comment.id} comment={comment}/>)}
      </ul>
      <ReviewForm/>
    </section>
  );
}

export default OfferReview;
