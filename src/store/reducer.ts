import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers } from './action';
import { offersShort } from '../mocks/offers-short';
import { City } from '../types/city';
import { OfferShort } from '../types/offer';
import { DEFAULT_CITY } from '../const';


type InitialCity = {
  activeCity: City;
  offers: OfferShort[];
}

const initialState: InitialCity = {
  activeCity: DEFAULT_CITY,
  offers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(loadOffers, (state) => {
      state.offers = offersShort;
    });
});

export {reducer};
