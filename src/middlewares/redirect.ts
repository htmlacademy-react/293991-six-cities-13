import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../browser-history';
import { Middleware } from 'redux';
import { rootReducer } from '../store/root-reducer';
import { ROUTE_REDIRECT } from '../const';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === ROUTE_REDIRECT) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };