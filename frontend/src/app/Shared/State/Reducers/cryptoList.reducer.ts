import { createReducer, on } from '@ngrx/store';

import { coinGeckoApiActions } from '../Actions/cryptoList.actions';
import { CoinsEntity } from '../../../Core/Interfaces/top-trending';

export const initialState: Array<CoinsEntity> = [];

export const cryptoReducer = createReducer(
  initialState,
  on(coinGeckoApiActions.retrieveCryptoList, (state, { cryptos }) => cryptos),
);
