import { Rating } from './types/rating';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const PARAGRAPH_MAX_LEN = 150;

export const RATINGS = [
  {
    score: 5,
    label: 'perfect'
  },
  {
    score: 4,
    label: 'good'
  },
  {
    score: 3,
    label: 'not bad'
  },
  {
    score: 2,
    label: 'badly'
  },
  {
    score: 1,
    label: 'terribly'
  },
] as Rating[];

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 500;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';


export enum OfferCardMode {
  MainPage = 'MAIN_PAGE',
  NearPlaces = 'NEAR_PLACES'
}

// с координатами !!!! в виде obj
export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const DEFAULT_CTY = CITIES[0];
