import { createReducer } from "@reduxjs/toolkit";
import { changeCity, loadOffers } from "./action";
import { offersShort } from "../mocks/offers-short";
import { CityName } from "../types/city";
import { OfferShort } from "../types/offer";


const initialState: {
  activeCity: CityName;
  offers: OfferShort[]
} = {
  activeCity: 'Paris',
  offers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
  .addCase(changeCity, (state, action) => {
    state.activeCity = action.payload;
  })
  .addCase(loadOffers, (state) => {
    state.offers = offersShort;
  })
});

export {reducer};