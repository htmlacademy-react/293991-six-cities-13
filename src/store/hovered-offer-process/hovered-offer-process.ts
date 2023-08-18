import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { HoveredOffer } from '../../types/state';

const initialState: HoveredOffer = {
  hoveredOffer: null
};

export const hoveredOfferProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setHoveredOffer: (state, action) => {
      state.hoveredOffer = action.payload;
    }
  }
});

export const {setHoveredOffer} = hoveredOfferProcess.actions;
