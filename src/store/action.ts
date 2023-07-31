import {createAction} from '@reduxjs/toolkit';
import { City } from '../types/city';

export const changeCity = createAction('CHANGE_CITY', (clickedCity: City) => {
  return {payload: clickedCity};
});

export const loadOffers = createAction('LOAD_OFFERS');
