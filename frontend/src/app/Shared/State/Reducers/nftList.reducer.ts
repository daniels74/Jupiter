import { createReducer, on } from '@ngrx/store';
import { NftsEntity } from '../../../Core/Interfaces/top-trending';
import { nftCoinGeckoApiActions } from '../Actions/nftList.actions';

export const initialState: Array<NftsEntity> = [];

export const nftReducer = createReducer(
  initialState,
  on(nftCoinGeckoApiActions.retrieveNFTS, (state, { nfts }) => nfts),
);
