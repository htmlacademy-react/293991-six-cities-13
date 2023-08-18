import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CITY, NameSpace, SortType } from '../../const';
import { OffersProcess } from '../../types/state';
import { getFavoritiesCount, getOffersByCity } from '../../utils/utils';
import { OfferShort } from '../../types/offer';
import { store } from '..';
import { loadOffersAction, loginAction } from '../../services/api-actions';

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

      // const wholeState = store.getState();
      // wholeState.FAVORITES.favoritesCount = getFavoritiesCount(state.offers);
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
      .addCase(loadOffersAction.fulfilled, (state, action) => {
        console.log(action)
      })
  }
});

export const {changeCity, saveOffers, changeSortType, changeOffersLoadingStatus} = offersProcess.actions;
