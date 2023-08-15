import { Link, generatePath } from 'react-router-dom';
import { OfferShort } from '../../types/offer';
import { capitalizeFirstLetter, convertRatingToWidthPerc } from '../../utils/utils';
import { AppRoute, OfferFavoriteStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeOfferFavoriteStatusAction } from '../../services/api-actions';
import { ToastContainer } from 'react-toastify';
import { deleteFavorite } from '../../store/action';

type FavoriteOfferCardProps = {
  offer: OfferShort;
}

function FavoriteOfferCard({offer}: FavoriteOfferCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  function onClickHandler() {
    const offerFavoriteStatus = offer.isFavorite ? OfferFavoriteStatus.Unset : OfferFavoriteStatus.Set;
    dispatch(changeOfferFavoriteStatusAction({offerId: offer.id, offerFavoriteStatus}));
    dispatch(deleteFavorite(offer.id));
  }

  return (
    <article className="favorites__card place-card">
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={generatePath(AppRoute.Offer, {id: offer.id})}>
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
          {
            offer.isFavorite ?
              <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button" onClick={onClickHandler}>
                <svg className="place-card__bookmark-icon" width={18} height={19}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">In bookmarks</span>
              </button> :
              <button className="place-card__bookmark-button button" type="button" onClick={onClickHandler}>
                <svg className="place-card__bookmark-icon" width={18} height={19}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
          }
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: convertRatingToWidthPerc(offer.rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, {id: offer.id})}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
      <ToastContainer/>
    </article>
  );
}

export default FavoriteOfferCard;
