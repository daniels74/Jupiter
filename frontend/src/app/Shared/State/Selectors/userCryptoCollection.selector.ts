import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CryptoId } from '../../../Core/Interfaces/top-trending';
import { SingleCoin } from '../../../Core/Interfaces/singleCoin.interface';

// export const selectUserCryptoCollection = createFeatureSelector<Array<any>>(
//   'cryptoCollection_ngrx',
// );

export const selectUserCryptoCollection = createFeatureSelector<
  SingleCoin[] | any
>('cryptoCollection_ngrx');

export const selectUserCryptoById = (id: string) =>
  createSelector(selectUserCryptoCollection, (collection) =>
    collection.find((c: { id: string }) => c.id === id),
  );
