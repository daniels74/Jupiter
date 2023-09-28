import { createActionGroup, props } from '@ngrx/store';
import { CryptoCoinObj } from '../../../Core/Interfaces/top-trending';

export const cryptoCoinGeckoApiActions = createActionGroup({
  source: 'Coin Gecko Api',
  events: {
    'Set Crypto List State': props<{ cryptos: Array<CryptoCoinObj> }>(),
  },
});
