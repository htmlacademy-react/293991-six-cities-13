import { StatusCodes } from 'http-status-codes';
import { City } from './types/city';
import { Rating } from './types/rating';
import { OfferShort } from './types/offer';
import { AuthUser } from './types/auth-data';
import { OfferDetailResponseData } from './types/offer-detail-response-data';
import { Comment } from './types/offer-review';
import { OfferFavoriteStatusResponseData } from './types/offer-favorite-status-response-data';
import { ErrorResponse } from './types/error-response';

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
export const MAX_COMMENT_LENGTH = 300;

export enum OfferCardMode {
  MainPage = 'MAIN_PAGE',
  NearPlaces = 'NEAR_PLACES',
  DetailPage = 'DETAIL_PAGE'
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
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
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

export enum BackendRoute {
  Login = '/login',
  Logout = '/logout',
  Offers = '/offers',
  OfferDetail = '/offers/:id',
  Comments = '/comments/:id',
  OffersNearBy = '/offers/:id/nearby',
  FavoriteStatus = '/favorite/:id/:status',
  Favorite = '/favorite'
}

export const TIMEOUT_SHOW_ERROR = 2000;

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const NEARBY_OFFFERS_COUNT = 3;

export const HTTP_CODES_TO_DISPLAY = [StatusCodes.BAD_REQUEST, StatusCodes.UNAUTHORIZED, StatusCodes.NOT_FOUND, StatusCodes.CONFLICT];

export enum FormControlToDisplayError {
  EmailControl = 'email',
  PasswordControl = 'password',
  CommentControl = 'comment',
  RatingControl = 'rating',
}
export const COMMON_ERROR_TYPE = 'COMMON_ERROR';

export const MAX_IMAGES_IN_OFFER_CARD = 6;
export const MAX_COMMENTS_IN_REVIEW = 10;

export enum OfferFavoriteStatus {
  Unset = 0,
  Set = 1
}

export enum NameSpace {
  User = 'USER',
  Offers = 'OFFERS',
  OfferDetail = 'OFFER_DETAIL',
  Favorites = 'FAVORITES',
  HoveredOffer = 'HOVERED_OFFER',
  ResponseError = 'RESPONSE_ERROR'
}

export const ROUTE_REDIRECT = 'route/redirect';

export const EMPTY_OFFERS_RESPONSE: OfferShort[] = [];
export const EMPTY_FAVORITES_RESPONSE: OfferShort[] = [];
export const EMPTY_AUTH_USER_RESPONSE: AuthUser = {
  name: '',
  avatarUrl: '',
  isPro: '',
  email: '',
  token: '',
};
export const EMPTY_OFFER_DETAIL_RESPONSE: OfferDetailResponseData = {
  offerDetail: null,
  offerComments: [],
  offersNearBy: []
};
export const EMPTY_COMMENT_RESPONSE: Comment = {
  id: '',
  comment: '',
  date: '',
  rating: 0,
  user: {
    isPro: false,
    name: '',
    avatarUrl: ''
  }
};

export const EMPTY_OFFER_FAVORITE_STATUS_RESPONSE: OfferFavoriteStatusResponseData = {
  currentOffer: null,
  favorites: EMPTY_FAVORITES_RESPONSE
};

export const PASSWORD_NO_HAVE_LETTER_OR_NUMBER: ErrorResponse = {
  errorType: 'VALIDATION_ERROR',
  message: 'Validation error: \'/six-cities/login\'',
  details: [
    {
      property: 'password',
      value: '1',
      messages: [
        'Password no have letter or number!'
      ]
    }
  ]
};

export const PASSWORD_MIN_LENGTH = 2;
export const PASSWORD_MUST_BE_LONGER_THEN: ErrorResponse = {
  errorType: 'VALIDATION_ERROR',
  message: 'Validation error: \'/six-cities/login\'',
  details: [
    {
      property: 'password',
      value: '1',
      messages: [
        'Password must be longer than or equal to 2 characters'
      ]
    }
  ]
};
