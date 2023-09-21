import { createReducer, on } from '@ngrx/store';
import { CryptoId } from '../../../Core/Interfaces/top-trending';
import { userCryptoCollectionAction } from '../Actions/userCryptoCollection.actions';

export const initialState: Array<CryptoId> = [];

export const userCryptoCollectionReducer = createReducer(
  initialState,
  on(
    userCryptoCollectionAction.setUserCryptoCollection,
    (state, { cryptoCollection_ngrx }) => cryptoCollection_ngrx,
  ),
);
