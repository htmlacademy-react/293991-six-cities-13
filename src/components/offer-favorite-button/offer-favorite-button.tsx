import { memo } from "react";
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { AppRoute, AuthorizationStatus, OfferCardMode, OfferFavoriteStatus } from "../../const";
import { changeOfferFavoriteStatusAction } from "../../services/api-actions";
import { getAuthorizationStatus } from "../../store/user-process/selectors";

type OfferFavoriteButtonType = {
  offerId: string;
  isFavorite: boolean;
  mode: OfferCardMode;
}

function OfferFavoriteButton({offerId, isFavorite, mode}: OfferFavoriteButtonType): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
      if (authorizationStatus !== AuthorizationStatus.Auth) {
        navigate(AppRoute.Login);
      }
      
      const offerFavoriteStatus = isFavorite ? OfferFavoriteStatus.Unset : OfferFavoriteStatus.Set;
      dispatch(changeOfferFavoriteStatusAction({offerId, offerFavoriteStatus}));
    }


  return (
    <button className={cn(
      'button',
      {'offer__bookmark-button': mode === OfferCardMode.DetailPage},
      {'offer__bookmark-button--active': isFavorite && mode === OfferCardMode.DetailPage},
      {'place-card__bookmark-button': [OfferCardMode.MainPage, OfferCardMode.NearPlaces].includes(mode)},
      {'place-card__bookmark-button--active': isFavorite && [OfferCardMode.MainPage, OfferCardMode.NearPlaces].includes(mode)}
    )}
    type="button"
    onClick={handleFavoriteClick}
    >
      <svg className={cn(
        {'offer__bookmark-icon': mode === OfferCardMode.DetailPage},
        {'place-card__bookmark-icon': [OfferCardMode.MainPage, OfferCardMode.NearPlaces].includes(mode)}
      )}
        width={mode === OfferCardMode.DetailPage ? 31 : 18}
        height={mode === OfferCardMode.DetailPage ? 33 : 19}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default memo(OfferFavoriteButton);
