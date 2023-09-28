import { createReducer, on } from '@ngrx/store';

import { cryptoCoinGeckoApiActions } from '../Actions/coingecko.actions';
import { CryptoCoinObj } from '../../../Core/Interfaces/top-trending';

export const initialState: Array<CryptoCoinObj> = [];

export const cryptoReducer = createReducer(
  initialState,
  on(
    cryptoCoinGeckoApiActions.setCryptoListState,
    (state, { cryptos }) => cryptos,
  ),
);
