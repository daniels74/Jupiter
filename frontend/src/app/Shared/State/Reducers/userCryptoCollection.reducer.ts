import { createReducer, on } from '@ngrx/store';
import { CryptoId } from '../../../Core/Interfaces/top-trending';
import { userCryptoCollectionAction } from '../Actions/userCryptoCollection.actions';
import { SingleCoin } from '../../../Core/Interfaces/singleCoin.interface';

export const initialState: SingleCoin[] | any = [];

export const userCryptoCollectionReducer = createReducer(
  initialState,
  on(
    userCryptoCollectionAction.setUserCryptoCollection,
    (state, { cryptoCollection_ngrx }) => cryptoCollection_ngrx,
  ),
  on(userCryptoCollectionAction.addCrypto, (state, { newCoin }) => [
    ...state,
    newCoin,
  ]),
  on(userCryptoCollectionAction.removeCryptoId, (state, { idToRemove }) =>
    state.filter((c: { id: string }) => c.id !== idToRemove),
  ),
);
