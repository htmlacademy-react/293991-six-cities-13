import {NameSpace} from '../../const';
import { OfferShort } from '../../types/offer';
import {State} from '../../types/state';

export const getHoveredOffer = (state: State): OfferShort | null | undefined => state[NameSpace.HoveredOffer].hoveredOffer;
