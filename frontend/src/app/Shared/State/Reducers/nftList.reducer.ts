import { createReducer, on } from '@ngrx/store';
import { NFT } from '../../../Core/Interfaces/top-trending';
import { nftCoinGeckoApiActions } from '../Actions/nftList.actions';

export const initialState: Array<NFT> = [];

export const nftReducer = createReducer(
  initialState,
  on(nftCoinGeckoApiActions.setTrendingNFTSState, (state, { nfts }) => nfts),
);
