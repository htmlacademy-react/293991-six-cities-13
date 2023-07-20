import { TPerson } from './person';

export type TComment = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: TPerson;
}

export type TReview = {
  offerId: string;
  comments: TComment[];
}
