import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, State } from "../types/state";
import { AxiosInstance } from "axios";
import { OfferShort } from "../types/offer";
import { APIRoute } from "../const";
import { changeOffersLoadingStatus, loadOffers } from "../store/action";

export const loadOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'LOAD_OFFERS',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferShort[]>(APIRoute.Offers);
    dispatch(changeOffersLoadingStatus(false))
    dispatch(loadOffers(data));
  },
);
