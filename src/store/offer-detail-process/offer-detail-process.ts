import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferDetailProcess } from '../../types/state';
import { filterNearByOffers, getFavoritiesCount, updateOfferFavoriteStatus } from '../../utils/utils';
import { addCommentAction, fetchOfferDetailAction } from '../../services/api-actions';

const initialState: OfferDetailProcess = {
  offerDetail: null,
  isOfferDetailLoading: true,
  offerComments: [],
  isOfferCommentSending: false,
  offersNearBy: [],
};

export const offerDetailProcess = createSlice({
  name: NameSpace.OfferDetail,
  initialState,
  reducers: {
    saveOfferDetail: (state, action) => {
      state.offerDetail = action.payload;
      state.isOfferDetailLoading = true;
    },
    changeOfferDetailLoadingStatus: (state, action) => {
      state.isOfferDetailLoading = action.payload;
    },
    deleteOfferDetail: (state) => {
      state.offerDetail = null;
      state.offerComments = [];
      state.offersNearBy = [];
      state.isOfferDetailLoading = true;
    },
    saveOfferComments: (state, action) => {
      state.offerComments = action.payload;
    },
    changeOfferCommentSendingStatus: (state, action) => {
      state.isOfferCommentSending = action.payload;
    },
    saveOffersNearBy: (state, action) => {
      state.offersNearBy = filterNearByOffers(action.payload);
    },
    changeOfferFavoriteStatus: (state, action) => {
      state.offersNearBy = updateOfferFavoriteStatus(state.offersNearBy, action.payload.id, action.payload.isFavorite);

      // const wholeState = store.getState();
      // wholeState.OFFERS.offers = updateOfferFavoriteStatus(wholeState.OFFERS.offers, action.payload.id, action.payload.isFavorite);
      // wholeState.OFFERS.offersByCity = updateOfferFavoriteStatus(wholeState.OFFERS.offersByCity, action.payload.id, action.payload.isFavorite);
      // wholeState.FAVORITES.favoritesCount = getFavoritiesCount(wholeState.OFFERS.offers);
      // if (state.offerDetail !== null && state.offerDetail.id === action.payload.id) {
      //   state.offerDetail.isFavorite = action.payload.isFavorite;
      // }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(addCommentAction.rejected, (state) => {
        state.isOfferCommentSending = false;
      })
      .addCase(fetchOfferDetailAction.fulfilled, (state) => {
        state.isOfferDetailLoading = false;
      })
      .addCase(fetchOfferDetailAction.rejected, (state) => {
        state.isOfferDetailLoading = false;
      })
  }
});

export const {saveOfferDetail, changeOfferDetailLoadingStatus, deleteOfferDetail, saveOfferComments, changeOfferCommentSendingStatus, saveOffersNearBy, changeOfferFavoriteStatus } = offerDetailProcess.actions;
