import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType, loadOffers } from './action';
import { offersShort } from '../mocks/offers-short';
import { City } from '../types/city';
import { OfferShort } from '../types/offer';
import { DEFAULT_CITY, SortType } from '../const';


type InitialCity = {
  activeCity: City;
  offers: OfferShort[];
  sortType: SortType;
}

const initialState: InitialCity = {
  activeCity: DEFAULT_CITY,
  offers: [],
  sortType: SortType.Popular
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(loadOffers, (state) => {
      state.offers = offersShort;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    });
});

export {reducer};
