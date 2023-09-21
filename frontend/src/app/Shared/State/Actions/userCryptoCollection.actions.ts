import { createActionGroup, props } from '@ngrx/store';
import { CryptoId } from '../../../Core/Interfaces/top-trending';

export const userCryptoCollectionAction = createActionGroup({
  source: 'Postgres Database',
  events: {
    'Set User Crypto Collection': props<{
      cryptoCollection_ngrx: Array<CryptoId>;
    }>(),
  },
});
