import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';

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
  }
});

export const {saveAuthorization, changeUserEmail} = userProcess.actions;
