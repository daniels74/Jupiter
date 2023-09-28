import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CryptoCoinObj, NFT } from '../../../Core/Interfaces/top-trending';

export const selectCrypto =
  createFeatureSelector<Array<CryptoCoinObj>>('cryptos');

export const selectNfts = createFeatureSelector<Array<NFT>>('nfts');
