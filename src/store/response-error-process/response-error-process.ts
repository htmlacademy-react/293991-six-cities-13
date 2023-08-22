import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ResponseError } from '../../types/state';
import { addCommentAction, loginAction, logoutAction } from '../../services/api-actions';
import { ErrorResponse } from '../../types/error-response';

const initialState: ResponseError = {
  errorResponse: null
};

export const errorResponseProcess = createSlice({
  name: NameSpace.ResponseError,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorResponse>) => {
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
      .addCase(addCommentAction.fulfilled, (state) => {
        state.errorResponse = null;
      });
  }
});

export const {setError} = errorResponseProcess.actions;
