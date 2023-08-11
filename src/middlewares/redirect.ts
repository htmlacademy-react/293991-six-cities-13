import {PayloadAction} from '@reduxjs/toolkit';
import {Middleware} from 'redux';
import { reducer } from '../store/reducer';
import browserHistory from '../browser-history';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'REDIRECT_TO_ROUTE') {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
