import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoriteProcess } from '../../types/state';
import { OfferShort } from '../../types/offer';
import { store } from '..';
import { eraseOfferFavoriteStatus } from '../../utils/utils';
import { loadOffersAction } from '../../services/api-actions';


const initialState: FavoriteProcess = {
  favoritesCount: 0,
  favorites: [],
  areFavoritesLoading: true,
};

export const favoriteProcess = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {
    saveFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    changeFavoritesLoadingStatus: (state, action) => {
      state.areFavoritesLoading = action.payload;
    },
    deleteFavorites: (state) => {
      state.favorites = [];
    },
    deleteFavorite: (state, action) => {
      state.favorites = [...state.favorites].reduce((accumulator: OfferShort[], curOffer: OfferShort) => (curOffer.id !== action.payload ? [...accumulator, curOffer] : [...accumulator]), []);
    },
    eraseFavoritesAfterLogout: (state) => {
      // const wholeState = store.getState();
      
      // wholeState.OFFERS.offers = eraseOfferFavoriteStatus(wholeState.OFFERS.offers);
      // wholeState.OFFERS.offersByCity = eraseOfferFavoriteStatus(wholeState.OFFERS.offersByCity);
      // state.favoritesCount = 0;
      // if (wholeState.OFFER_DETAIL.offerDetail !== null) {
      //   wholeState.OFFER_DETAIL.offerDetail.isFavorite = false;
      // }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadOffersAction.fulfilled, (state, action) => {
        console.log(state, action)
        // state.isOfferCommentSending = false;
      })
  }
});

export const { saveFavorites, changeFavoritesLoadingStatus, deleteFavorites, deleteFavorite, eraseFavoritesAfterLogout } = favoriteProcess.actions;
