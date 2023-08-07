import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeOffersLoadingStatus, changeSortType, changeUserEmail, loadOffers, requireAuthorization } from './action';
import { City } from '../types/city';
import { OfferShort } from '../types/offer';
import { AuthorizationStatus, DEFAULT_CITY, SortType } from '../const';


type InitialCity = {
  activeCity: City;
  offers: OfferShort[];
  sortType: SortType;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
}

const initialState: InitialCity = {
  activeCity: DEFAULT_CITY,
  offers: [],
  sortType: SortType.Popular,
  isOffersLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: ''
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(changeOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(changeUserEmail, (state, action) => {
      state.userEmail = action.payload;
    });
});

export {reducer};
