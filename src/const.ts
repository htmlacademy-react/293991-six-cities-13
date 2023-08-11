import { City } from './types/city';
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

export const CITIES: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
];

export const DEFAULT_CITY_NAME = 'Paris';
export const DEFAULT_CITY = CITIES.find((city: City) => city.name === DEFAULT_CITY_NAME) as City;

export enum SortType {
  Popular = 'Popular',
  Price_low_to_high = 'Price: low to high',
  Price_high_to_low = 'Price: high to low',
  Top_rated_first = 'Top rated first'
}

export const SORT_TYPES = [SortType.Popular, SortType.Price_low_to_high, SortType.Price_high_to_low, SortType.Top_rated_first];

export const BACKEND_URL = 'https://13.design.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;

export enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Offers = '/offers',
}

export const TIMEOUT_SHOW_ERROR = 2000;

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
