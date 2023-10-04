import { createReducer, on } from '@ngrx/store';
import { CryptoId } from '../../../Core/Interfaces/top-trending';
import { userCryptoCollectionAction } from '../Actions/userCryptoCollection.actions';
import { SingleCoin } from '../../../Core/Interfaces/singleCoin.interface';

export const initialState: Array<any> = [];

export const userCryptoCollectionReducer = createReducer(
  initialState,
  on(
    userCryptoCollectionAction.setUserCryptoCollection,
    (state, { cryptoCollection_ngrx }) => cryptoCollection_ngrx,
  ),
);
