import {NameSpace} from '../../const';
import { OfferShort } from '../../types/offer';
import {State} from '../../types/state';

export const getAreFavoritesLoading = (state: State): boolean => state[NameSpace.Favorites].areFavoritesLoading;
export const getFavorites = (state: State): OfferShort[] => state[NameSpace.Favorites].favorites;
export const getFavoritesCount = (state: State): number | null => state[NameSpace.Favorites].favoritesCount;
