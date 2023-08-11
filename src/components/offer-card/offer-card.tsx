import { Link, generatePath } from 'react-router-dom';
import { AppRoute, OfferCardMode } from '../../const';
import { OfferShort } from '../../types/offer';
import offerCardPremium from '../offer-card-premium/offer-card-premium';
import cn from 'classnames';

type OfferCardProps = {
  offerShort: OfferShort;
  onMouseEnterHandler: () => void;
  mode: OfferCardMode;
}

function OfferCard({offerShort, onMouseEnterHandler, mode}: OfferCardProps): JSX.Element {

  return (
    <article
      className={cn(
        'place-card',
        {'cities__card': mode === OfferCardMode.MainPage},
        {'near-places__card': mode === OfferCardMode.NearPlaces}
      )}
      onMouseEnter={onMouseEnterHandler}
    >
      {offerShort.isPremium && offerCardPremium()}
      <div className={cn(
        'place-card__image-wrapper',
        {'cities__image-wrapper': mode === OfferCardMode.MainPage},
        {'near-places__image-wrapper': mode === OfferCardMode.NearPlaces}
      )}
      >
        <Link to={generatePath(AppRoute.Offer, {id: offerShort.id})}>
          <img
            className="place-card__image"
            src={offerShort.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offerShort.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button button"
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offerShort.rating / 5 * 100}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, {id: offerShort.id})}>{offerShort.title}</Link>
        </h2>
        <p className="place-card__type">{offerShort.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
