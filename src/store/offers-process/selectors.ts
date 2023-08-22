import {NameSpace, SortType} from '../../const';
import { City } from '../../types/city';
import { OfferShort } from '../../types/offer';
import {State} from '../../types/state';

export const getAreOffersLoading = (state: State): boolean => state[NameSpace.Offers].areOffersLoading;
export const getActiveCity = (state: State): City => state[NameSpace.Offers].activeCity;
export const getOffersByCity = (state: State): OfferShort[] => state[NameSpace.Offers].offersByCity;
export const getOffers = (state: State): OfferShort[] => state[NameSpace.Offers].offers;
export const getSortType = (state: State): SortType => state[NameSpace.Offers].sortType;
