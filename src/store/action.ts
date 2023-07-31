import {createAction} from '@reduxjs/toolkit';
import { CityName } from '../types/city';

export const changeCity = createAction('CHANGE_CITY', (clickedCity: CityName) => {
  return {payload: clickedCity};
});

export const loadOffers = createAction('LOAD_OFFERS');

export const selectOffers = createAction('SELECT_OFFERS');