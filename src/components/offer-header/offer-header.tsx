import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, OfferCardMode, OfferFavoriteStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeOfferFavoriteStatusAction } from '../../services/api-actions';
import { OfferDetail } from '../../types/offer';
import cn from 'classnames';
import { memo } from 'react';
import OfferFavoriteButton from '../offer-favorite-button/offer-favorite-button';

type OfferHeaderProps = {
  offerDetail: OfferDetail;
}

function OfferHeader({offerDetail}: OfferHeaderProps):JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // function onClickHandler() {
  //   if (authorizationStatus !== AuthorizationStatus.Auth) {
  //     navigate(AppRoute.Login);
  //   }

  //   if (offerDetail) {
  //     const offerFavoriteStatus = offerDetail.isFavorite ? OfferFavoriteStatus.Unset : OfferFavoriteStatus.Set;
  //     dispatch(changeOfferFavoriteStatusAction({offerId: offerDetail.id, offerFavoriteStatus}));
  //   }
  // }

  return (
    <>
      {
        offerDetail?.isPremium &&
        <div className="offer__mark">
          <span>Premium</span>
        </div>
      }
      <div className="offer__name-wrapper">
        <h1 className="offer__name">
          {offerDetail.title}
        </h1>
        {/* <button className={cn(
          'offer__bookmark-button button',
          {'offer__bookmark-button--active': offerDetail?.isFavorite}
        )}
        type="button"
        onClick={onClickHandler}
        >
          <svg className="offer__bookmark-icon" width={31} height={33}>
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">{offerDetail?.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
        </button> */}
        <OfferFavoriteButton offerId={offerDetail.id} mode={OfferCardMode.DetailPage} isFavorite={offerDetail.isFavorite}/>
      </div>
    </>
  );
}

export default memo(OfferHeader);
