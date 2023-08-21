import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../../services/api-actions';
import { deleteToken, saveToken } from '../../services/token';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: ''
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    saveAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    changeUserEmail: (state, action) => {
      state.userEmail = action.payload;
    }
  },
  extraReducers(builder) {
    builder

      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userEmail = action.payload.email;
        // saveToken(action.payload.token)
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userEmail = '';
        deleteToken();
      })

      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userEmail = action.payload.email;
        // saveToken(action.payload.token)
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userEmail = '';
        deleteToken();
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userEmail = '';
        deleteToken();
      })
  }
});

export const {saveAuthorization, changeUserEmail} = userProcess.actions;
