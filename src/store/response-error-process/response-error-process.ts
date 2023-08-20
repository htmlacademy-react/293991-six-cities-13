import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ResponseError } from '../../types/state';
import { loginAction, logoutAction } from '../../services/api-actions';

const initialState: ResponseError = {
  errorResponse: null
};

export const errorResponseProcess = createSlice({
  name: NameSpace.ResponseError,
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errorResponse = action.payload;
    }
  },
  extraReducers(builder) {
    builder
    .addCase(loginAction.fulfilled, (state) => {
      state.errorResponse = null;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.errorResponse = null;
    })
  }
});

export const {setError} = errorResponseProcess.actions;
