import {createAction} from '@reduxjs/toolkit';
import { AppRoute, ROUTE_REDIRECT } from '../const';

export const redirectToRoute = createAction<AppRoute>(ROUTE_REDIRECT);
