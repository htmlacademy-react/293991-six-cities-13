import { OfferShort } from './offer';

export type AuthRequestData = {
  email: string;
  password: string;
};

export type AuthResponseData = {
  name: string;
  avatarUrl: string;
  isPro: string;
  email: string;
  token: string;
  offers: OfferShort[];
};
