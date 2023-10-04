import { createActionGroup, props } from '@ngrx/store';

export const userNftCollectionAction = createActionGroup({
  source: 'Postgres Database',
  events: {
    'Set User Nft Collection': props<{
      nftCollection_ngrx: Array<any>;
    }>(),
  },
});
