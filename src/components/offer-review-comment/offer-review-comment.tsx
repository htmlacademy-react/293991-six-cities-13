import { Comment } from "../../types/offer-review";
import { convertRatingToWidthPerc, getRandomKey, convertToYYYYMMDD, splitLongTextIntoParagraphs, convertToMonthYYYY } from "../../utils/utils";

type OfferReviewCommentProps = {
  comment: Comment;
}

function OfferReviewComment({comment}: OfferReviewCommentProps): JSX.Element {
  const paragraphs = splitLongTextIntoParagraphs(comment.comment)

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={comment.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{comment.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: convertRatingToWidthPerc(comment.rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        {paragraphs.map((paragraph: string) => <p className="reviews__text" key={getRandomKey()}>{paragraph}</p>)}
        <time className="reviews__time" dateTime={convertToYYYYMMDD(comment.date)}>
          {convertToMonthYYYY(comment.date)}
        </time>
      </div>
    </li>    
  )
}

export default OfferReviewComment;
