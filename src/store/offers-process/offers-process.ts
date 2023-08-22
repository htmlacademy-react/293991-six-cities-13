import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace, SortType } from '../../const';
import { OffersProcess } from '../../types/state';
import { eraseOfferFavoriteStatus, getOffersByCity, updateOfferFavoriteStatus } from '../../utils/utils';
import { OfferShort } from '../../types/offer';
import { changeOfferFavoriteStatusAction, fetchOffersAction, loginAction, logoutAction } from '../../services/api-actions';
import { City } from '../../types/city';

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
    changeCity: (state, action: PayloadAction<City>) => {
      state.activeCity = action.payload;
      state.offersByCity = getOffersByCity<OfferShort>(state.offers, action.payload.name);
    },
    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
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
        state.offers = action.payload.offers;
        state.offersByCity = getOffersByCity<OfferShort>(state.offers, state.activeCity.name);
        state.areOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.areOffersLoading = false;
      })

      .addCase(loginAction.pending, (state) => {
        state.areOffersLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.offers = action.payload.offers;
        state.offersByCity = getOffersByCity<OfferShort>(state.offers, state.activeCity.name);
        state.areOffersLoading = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.areOffersLoading = false;
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.offers = eraseOfferFavoriteStatus(state.offers);
        state.offersByCity = eraseOfferFavoriteStatus(state.offersByCity);
      })

      .addCase(changeOfferFavoriteStatusAction.fulfilled, (state, action) => {
        state.offers = updateOfferFavoriteStatus(state.offers, action.payload.currentOffer.id, action.payload.currentOffer.isFavorite);
        state.offersByCity = updateOfferFavoriteStatus(state.offersByCity, action.payload.currentOffer.id, action.payload.currentOffer.isFavorite);
      });
  }
});

export const {changeCity, changeSortType, deleteOffers} = offersProcess.actions;
