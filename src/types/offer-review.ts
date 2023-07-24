import { Person } from './person';

export type Comment = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: Person;
}

export type Review = {
  offerId: string;
  comments: Comment[];
}
