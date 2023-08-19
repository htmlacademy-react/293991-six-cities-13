import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace, SortType } from '../../const';
import { OffersProcess } from '../../types/state';
import { eraseOfferFavoriteStatus, getFavoritiesCount, getOffersByCity } from '../../utils/utils';
import { OfferShort } from '../../types/offer';
import { store } from '..';
import { fetchOffersAction, loginAction, logoutAction } from '../../services/api-actions';

const initialState: OffersProcess = {
  activeCity: DEFAULT_CITY,
  offers: [],
  offersByCity: [],
  sortType: SortType.Popular,
  areOffersLoading: false,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.activeCity = action.payload;
      state.offersByCity = getOffersByCity<OfferShort>(state.offers, action.payload.name);
    },
    saveOffers: (state, action) => {
      state.offers = action.payload;
      state.offersByCity = getOffersByCity<OfferShort>(state.offers, state.activeCity.name);
    },
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
    changeOffersLoadingStatus: (state, action) => {
      state.areOffersLoading = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.areOffersLoading = false;
        state.offers = action.payload;

        state.offersByCity = getOffersByCity<OfferShort>(state.offers, state.activeCity.name);
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.areOffersLoading = false;
      })
      .addCase(loginAction.pending, (state) => {
        state.areOffersLoading = true;
      })
      .addCase(logoutAction.pending, (state) => {
        state.offers = eraseOfferFavoriteStatus(state.offers);
        state.offersByCity = eraseOfferFavoriteStatus(state.offersByCity);
      })
  }
});

export const {changeCity, saveOffers, changeSortType, changeOffersLoadingStatus} = offersProcess.actions;
