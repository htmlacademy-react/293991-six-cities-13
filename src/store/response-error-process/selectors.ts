import {NameSpace} from '../../const';
import { ErrorResponse } from '../../types/error-response';
import {State} from '../../types/state';

export const getErrorResponse = (state: State): ErrorResponse | null => state[NameSpace.ResponseError].errorResponse;
