import { createActionGroup, props } from '@ngrx/store';
import { CryptoId } from '../../../Core/Interfaces/top-trending';
import { SingleCoin } from '../../../Core/Interfaces/singleCoin.interface';

export const userCryptoCollectionAction = createActionGroup({
  source: 'Postgres Database',
  events: {
    'Set User Crypto Collection': props<{
      cryptoCollection_ngrx: SingleCoin[] | any;
    }>(),
    'Add Crypto': props<{ newCoin: SingleCoin }>(),
    'Remove Crypto Id': props<{ idToRemove: string }>(), // new action
  },
});
