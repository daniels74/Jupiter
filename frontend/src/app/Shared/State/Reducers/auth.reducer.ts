import { createReducer, on } from '@ngrx/store';
import { authAction } from '../Actions/auth.actions';

export const initialState = false;

export const authReducer = createReducer(
  initialState,
  on(
    authAction.setAuthenticationState,
    (state, { authState_ngrx }) => authState_ngrx,
  ),
);
