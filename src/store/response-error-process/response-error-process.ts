import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ResponseError } from '../../types/state';

const initialState: ResponseError = {
  errorResponse: null
};

export const responseErrorProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errorResponse = action.payload;
    }
  }
});

export const {setError} = responseErrorProcess.actions;
