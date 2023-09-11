import { createActionGroup, props } from '@ngrx/store';
import {
  CoinsEntity,
  TopTrending,
} from '../../../Core/Interfaces/top-trending';

export const coinGeckoApiActions = createActionGroup({
  source: 'Coin Gecko Api',
  events: {
    'Retrieve Crypto List': props<{ cryptos: Array<CoinsEntity> }>(),
  },
});
