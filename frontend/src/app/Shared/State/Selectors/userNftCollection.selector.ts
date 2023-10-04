import { createFeatureSelector } from '@ngrx/store';

export const selectUserNftCollection =
  createFeatureSelector<Array<any>>('nftCollection_ngrx');
