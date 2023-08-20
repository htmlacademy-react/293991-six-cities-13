import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcess} from './user-process/user-process';
import { offersProcess } from './offers-process/offers-process';
import { favoriteProcess } from './favorite-process/favorite-process';
import { offerDetailProcess } from './offer-detail-process/offer-detail-process';
import { errorResponseProcess } from './response-error-process/response-error-process';
import { hoveredOfferProcess } from './hovered-offer-process/hovered-offer-process';


export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Favorites]: favoriteProcess.reducer,
  [NameSpace.OfferDetail]: offerDetailProcess.reducer,
  [NameSpace.ResponseError]: errorResponseProcess.reducer,
  [NameSpace.HoveredOffer]: hoveredOfferProcess.reducer
});
