import { createReducer, on } from '@ngrx/store';
import { userNftCollectionAction } from '../Actions/userNftCollection.actions';

export const initialState: Array<any> = [];

export const userNftCollectionReducer = createReducer(
  initialState,
  on(
    userNftCollectionAction.setUserNftCollection,
    (state, { nftCollection_ngrx }) => nftCollection_ngrx,
  ),
);
