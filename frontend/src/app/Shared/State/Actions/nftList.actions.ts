import { createActionGroup, props } from '@ngrx/store';
import { NFT } from '../../../Core/Interfaces/top-trending';

export const nftCoinGeckoApiActions = createActionGroup({
  source: 'NFT API',
  events: {
    'Set Trending NFTS State': props<{ nfts: Array<NFT> }>(),
  },
});
