import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../../services/api-actions';
import { deleteToken } from '../../services/token';
import { AuthUser } from '../../types/auth-data';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: ''
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthUser & {authorizationStatus: AuthorizationStatus}>) => {

      console.log(action.payload)

      state.authorizationStatus = action.payload.authorizationStatus;
      state.userEmail = action.payload.email;
    }
  },
  extraReducers(builder) {
    builder

      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = action.payload.authorizationStatus;
        state.userEmail = action.payload.email;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userEmail = '';
        deleteToken();
      })

      // .addCase(loginAction.fulfilled, (state, action) => {
      //   state.authorizationStatus = action.payload.authorizationStatus;
      //   state.userEmail = action.payload.email;
      // })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userEmail = '';
        deleteToken();
      })

      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userEmail = '';
        deleteToken();
      });
  }
});

export const {setAuthData} = userProcess.actions;