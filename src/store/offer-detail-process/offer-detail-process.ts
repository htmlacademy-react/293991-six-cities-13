import { createSlice } from '@reduxjs/toolkit';
import { MAX_COMMENTS_IN_REVIEW, NameSpace } from '../../const';
import { OfferDetailProcess } from '../../types/state';
import { filterNearByOffers, getFavoritiesCount, updateOfferFavoriteStatus } from '../../utils/utils';
import { addCommentAction, fetchOfferCommentsAction, fetchOfferDetailDataAction, fetchOfferNearByAction } from '../../services/api-actions';
import { differenceInSeconds } from 'date-fns';

const initialState: OfferDetailProcess = {
  offerDetail: null,
  isOfferDetailLoading: true,
  offerComments: [],
  areOfferCommentsLoading: true,
  isOfferCommentSending: false,
  offersNearBy: [],
  areNearByLoading: true,
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
      .addCase(fetchOfferDetailDataAction.pending, (state) => {
        state.isOfferDetailLoading = true;
      })
      .addCase(fetchOfferDetailDataAction.fulfilled, (state, action) => {
        state.offerDetail = action.payload;
        state.isOfferDetailLoading = false;
      })
      .addCase(fetchOfferDetailDataAction.rejected, (state) => {
        state.offerDetail = null;
        state.isOfferDetailLoading = false;
      })

      .addCase(fetchOfferCommentsAction.pending, (state) => {
        state.areOfferCommentsLoading = true;
      })
      .addCase(fetchOfferCommentsAction.fulfilled, (state, action) => {
        state.offerComments = action.payload;
        state.areOfferCommentsLoading = false;
      })
      .addCase(fetchOfferCommentsAction.rejected, (state) => {
        state.offerComments = [];
        state.areOfferCommentsLoading = false;
      })

      .addCase(fetchOfferNearByAction.pending, (state) => {
        state.areNearByLoading = true;
      })
      .addCase(fetchOfferNearByAction.fulfilled, (state, action) => {
        state.offersNearBy = action.payload;
        state.areNearByLoading = false;
      })
      .addCase(fetchOfferNearByAction.rejected, (state) => {
        state.offersNearBy = [];
        state.areNearByLoading = false;
      })

      .addCase(addCommentAction.pending, (state) => {
        state.isOfferCommentSending = true;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.offerComments = [...state.offerComments, action.payload];
        state.isOfferCommentSending = false;
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.isOfferCommentSending = false;
      })
    }
});

export const {saveOfferDetail, changeOfferDetailLoadingStatus, deleteOfferDetail, saveOfferComments, changeOfferCommentSendingStatus, saveOffersNearBy, changeOfferFavoriteStatus } = offerDetailProcess.actions;
