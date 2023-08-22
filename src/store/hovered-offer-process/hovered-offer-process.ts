import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { HoveredOffer } from '../../types/state';
import { OfferShort } from '../../types/offer';

const initialState: HoveredOffer = {
  hoveredOffer: null
};

export const hoveredOfferProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setHoveredOffer: (state, action: PayloadAction<OfferShort | null>) => {
      state.hoveredOffer = action.payload;
    }
  }
});

export const {setHoveredOffer} = hoveredOfferProcess.actions;
