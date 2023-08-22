import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoriteProcess } from '../../types/state';
import { OfferShort } from '../../types/offer';
import { changeOfferFavoriteStatusAction, fetchFavoritesAction, fetchOffersAction, loginAction, logoutAction } from '../../services/api-actions';
import { getFavoritiesCount } from '../../utils/utils';


const initialState: FavoriteProcess = {
  favoritesCount: null,
  favorites: [],
  areFavoritesLoading: true,
};

export const favoriteProcess = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {
    eraseFavoritesCount: (state) => {
      state.favoritesCount = null;
    },
    changeFavoritesLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.areFavoritesLoading = action.payload;
    },
    deleteFavorites: (state) => {
      state.favorites = [];
    },
    deleteFavorite: (state, action) => {
      state.favorites = [...state.favorites].reduce((accumulator: OfferShort[], curOffer: OfferShort) => (curOffer.id !== action.payload ? [...accumulator, curOffer] : [...accumulator]), []);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.areFavoritesLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoritesCount = action.payload.length;
        state.favorites = action.payload;
        state.areFavoritesLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.areFavoritesLoading = false;
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.favoritesCount = null;
        state.favorites = [];
      })

      .addCase(changeOfferFavoriteStatusAction.fulfilled, (state, action) => {
        state.favorites = action.payload.favorites;
        state.favoritesCount = action.payload.favorites.length;
      })
      
      .addCase(loginAction.fulfilled, (state, action) => {
        state.favoritesCount = getFavoritiesCount(action.payload.offers);
      })
      
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.favoritesCount = getFavoritiesCount(action.payload);
      });
  }
});

export const { eraseFavoritesCount, changeFavoritesLoadingStatus, deleteFavorites, deleteFavorite } = favoriteProcess.actions;
