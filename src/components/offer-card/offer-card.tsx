import { Link, generatePath } from 'react-router-dom';
import { AppRoute, OfferCardMode } from '../../const';
import offerCardPremium from '../offer-card-premium/offer-card-premium';
import cn from 'classnames';
import { convertRatingToWidthPerc } from '../../utils/utils';
import 'react-toastify/dist/ReactToastify.css';
import { memo } from 'react';
import OfferFavoriteButton from '../offer-favorite-button/offer-favorite-button';
import { useAppDispatch } from '../../hooks';
import { OfferShort } from '../../types/offer';
import { setHoveredOffer } from '../../store/hovered-offer-process/hovered-offer-process';
import { changeCity } from '../../store/offers-process/offers-process';

type OfferCardProps = {
  offer: OfferShort;
  mode: OfferCardMode;
}

function OfferCard({offer, mode}: OfferCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const handleCardClick = () => dispatch(changeCity(offer.city));

  return (
    <article
      className={cn(
        'place-card',
        {'cities__card': mode === OfferCardMode.MainPage},
        {'near-places__card': mode === OfferCardMode.NearPlaces}
      )}
      onMouseEnter={() => mode === OfferCardMode.MainPage && dispatch(setHoveredOffer(offer))}
      onMouseLeave={() => mode === OfferCardMode.MainPage && dispatch(setHoveredOffer(null))}
    >
      {offer.isPremium && offerCardPremium()}
      <div className={cn(
        'place-card__image-wrapper',
        {'cities__image-wrapper': mode === OfferCardMode.MainPage},
        {'near-places__image-wrapper': mode === OfferCardMode.NearPlaces}
      )}
      >
        <Link to={generatePath(AppRoute.Offer, {id: offer.id})} onClick={handleCardClick}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <OfferFavoriteButton offerId={offer.id} mode={mode} isFavorite={offer.isFavorite}/>
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
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default memo(OfferCard);
