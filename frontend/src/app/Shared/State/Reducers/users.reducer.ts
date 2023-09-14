import { createReducer, on } from '@ngrx/store';
import { User } from '../../../Core/Interfaces/User.interface';
import { usersAction } from '../Actions/users.actions';

export const defaultUser: User = <User>{};

export const usersReducer = createReducer(
  defaultUser,
  on(
    usersAction.setCurrentUserState,
    (state, { userState_ngrx }) => userState_ngrx,
  ),
);
