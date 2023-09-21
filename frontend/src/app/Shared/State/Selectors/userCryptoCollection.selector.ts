import { createFeatureSelector } from '@ngrx/store';
import { CryptoId } from '../../../Core/Interfaces/top-trending';

export const selectUserCryptoCollection = createFeatureSelector<
  Array<CryptoId>
>('cryptoCollection_ngrx');
