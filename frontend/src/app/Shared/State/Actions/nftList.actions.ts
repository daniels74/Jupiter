import { createActionGroup, props } from '@ngrx/store';
import { NftsEntity } from '../../../Core/Interfaces/top-trending';

export const nftCoinGeckoApiActions = createActionGroup({
  source: 'NFT API',
  events: {
    'Retrieve NFTS': props<{ nfts: Array<NftsEntity> }>(),
  },
});
