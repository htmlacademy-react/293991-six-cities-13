import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace, SortType } from '../../const';
import { OffersProcess } from '../../types/state';
import { eraseOfferFavoriteStatus, getFavoritiesCount, getOffersByCity } from '../../utils/utils';
import { OfferShort } from '../../types/offer';
import { store } from '..';
import { fetchOfferDetailDataAction, fetchOffersAction, loginAction, logoutAction } from '../../services/api-actions';

const initialState: OffersProcess = {
  activeCity: DEFAULT_CITY,
  offers: [],
  offersByCity: [],
  sortType: SortType.Popular,
  areOffersLoading: true,
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
    },
    deleteOffers: (state) => {
      state.offers = [];
      state.offersByCity = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.areOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersByCity = getOffersByCity<OfferShort>(state.offers, state.activeCity.name);
        state.areOffersLoading = false;
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

      // .addCase(fetchOfferDetailDataAction.fulfilled, (state, action) => {
      //   state.offers = updateOfferFavoriteStatus(state.offers, action.payload.id, action.payload.isFavorite);
      // })
  }
});

export const {changeCity, saveOffers, changeSortType, changeOffersLoadingStatus, deleteOffers} = offersProcess.actions;
