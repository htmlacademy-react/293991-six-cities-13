import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType, loadOffers, requireAuthorization, setError } from './action';
import { City } from '../types/city';
import { OfferShort } from '../types/offer';
import { AuthorizationStatus, DEFAULT_CITY, SortType } from '../const';


type InitialCity = {
  activeCity: City;
  offers: OfferShort[];
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: InitialCity = {
  activeCity: DEFAULT_CITY,
  offers: [],
  sortType: SortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null
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
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
    
});

export {reducer};
