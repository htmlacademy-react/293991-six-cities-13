import { OfferCardMode } from '../../const';
import { OfferDetail } from '../../types/offer';
import { memo } from 'react';
import OfferFavoriteButton from '../offer-favorite-button/offer-favorite-button';

type OfferHeaderProps = {
  offerDetail: OfferDetail;
}

function OfferHeader({offerDetail}: OfferHeaderProps):JSX.Element {
  return (
    <>
      {
        offerDetail.isPremium &&
        <div className="offer__mark">
          <span>Premium</span>
        </div>
      }
      <div className="offer__name-wrapper">
        <h1 className="offer__name">
          {offerDetail.title}
        </h1>
        <OfferFavoriteButton offerId={offerDetail.id} mode={OfferCardMode.DetailPage} isFavorite={offerDetail.isFavorite}/>
      </div>
    </>
  );
}

export default memo(OfferHeader);
