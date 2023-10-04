import { createFeatureSelector } from '@ngrx/store';
import { CryptoId } from '../../../Core/Interfaces/top-trending';
import { SingleCoin } from '../../../Core/Interfaces/singleCoin.interface';

export const selectUserCryptoCollection = createFeatureSelector<Array<any>>(
  'cryptoCollection_ngrx',
);
