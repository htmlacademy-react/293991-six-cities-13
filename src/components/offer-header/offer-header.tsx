import { OfferFavoriteStatus } from "../../const";
import { useAppDispatch } from "../../hooks";
import { changeOfferFavoriteStatusAction } from "../../services/api-actions";
import { OfferDetail } from "../../types/offer";
import cn from 'classnames';

type OfferHeaderProps = {
  offerDetail: OfferDetail | null;
}

function OfferHeader({offerDetail}: OfferHeaderProps):JSX.Element {
  const dispatch = useAppDispatch();

  function onClickHandler() {
    if (offerDetail) {
      const offerFavoriteStatus = offerDetail.isFavorite ? OfferFavoriteStatus.Unset : OfferFavoriteStatus.Set;
      dispatch(changeOfferFavoriteStatusAction({offerId: offerDetail.id, offerFavoriteStatus}))
    }
  }

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
          {offerDetail?.title}
        </h1>

        { offerDetail?.isFavorite ?
            <button className="offer__bookmark-button offer__bookmark-button--active button" type="button" onClick={onClickHandler}>
              <svg className="offer__bookmark-icon" width={31} height={33}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button> :
            <button className="offer__bookmark-button button" type="button" onClick={onClickHandler}>
              <svg className="offer__bookmark-icon" width={31} height={33}>
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          }
      </div>
    </>
  );
}

export default OfferHeader;
