import { createSlice } from '@reduxjs/toolkit';
import { OfferDetailProcess } from '../../types/state';
import { eraseOfferFavoriteStatus, getRandomNearByOffers, updateOfferFavoriteStatus } from '../../utils/utils';
import { addCommentAction, changeOfferFavoriteStatusAction, fetchOfferDetailDataAction, logoutAction } from '../../services/api-actions';
import { NameSpace } from '../../const';

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
    deleteOfferDetail: (state) => {
      state.offerDetail = null;
      state.offerComments = [];
      state.offersNearBy = [];
      state.isOfferDetailLoading = true;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferDetailDataAction.pending, (state) => {
        state.isOfferDetailLoading = true;
      })
      .addCase(fetchOfferDetailDataAction.fulfilled, (state, action) => {
        state.offerDetail = action.payload.offerDetail;
        state.offerComments = action.payload.offerComments;
        state.offersNearBy = getRandomNearByOffers(action.payload.offersNearBy, action.payload.offerDetail);
        state.isOfferDetailLoading = false;
      })
      .addCase(fetchOfferDetailDataAction.rejected, (state) => {
        state.offerDetail = null;
        state.offerComments = [];
        state.offersNearBy = [];
        state.isOfferDetailLoading = false;
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

      .addCase(changeOfferFavoriteStatusAction.fulfilled, (state, action) => {
        if (state.offerDetail?.id === action.payload.currentOffer.id) {
          state.offerDetail.isFavorite = action.payload.currentOffer.isFavorite;
        }
        state.offersNearBy = updateOfferFavoriteStatus(state.offersNearBy, action.payload.currentOffer.id, action.payload.currentOffer.isFavorite);
      })

      .addCase(logoutAction.fulfilled, (state) => {
        if (state.offerDetail !== undefined && state.offerDetail !== null) {
          state.offerDetail.isFavorite = false;
        }
        state.offersNearBy = eraseOfferFavoriteStatus(state.offersNearBy);
      });
  }
});

export const { deleteOfferDetail } = offerDetailProcess.actions;
