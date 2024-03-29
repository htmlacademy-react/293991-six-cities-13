import { Link, generatePath } from 'react-router-dom';
import { OfferShort } from '../../types/offer';
import { capitalizeFirstLetter, convertRatingToWidthPerc } from '../../utils/utils';
import { AppRoute, OfferFavoriteStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeOfferFavoriteStatusAction } from '../../services/api-actions';
import cn from 'classnames';
import { deleteFavorite } from '../../store/favorite-process/favorite-process';
import { changeCity } from '../../store/offers-process/offers-process';

type FavoriteOfferCardProps = {
  offer: OfferShort;
}

function FavoriteOfferCard({offer}: FavoriteOfferCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  function handleFavoriteClick() {
    const offerFavoriteStatus = offer.isFavorite ? OfferFavoriteStatus.Unset : OfferFavoriteStatus.Set;
    dispatch(changeOfferFavoriteStatusAction({offerId: offer.id, offerFavoriteStatus}));
    dispatch(deleteFavorite(offer.id));
  }

  const handleCardClick = () => dispatch(changeCity(offer.city));

  return (
    <article className="favorites__card place-card">
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={generatePath(AppRoute.Offer, {id: offer.id})} onClick={handleCardClick}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={150}
            height={110}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">
              /&nbsp;night
            </span>
          </div>

          <button className={cn(
            'place-card__bookmark-button button',
            {'place-card__bookmark-button--active': offer.isFavorite}
          )}
          type="button"
          onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: convertRatingToWidthPerc(offer.rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, {id: offer.id})} onClick={handleCardClick}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}

export default FavoriteOfferCard;
