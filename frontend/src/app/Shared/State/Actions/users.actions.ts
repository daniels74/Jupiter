import { createActionGroup, props } from '@ngrx/store';
import { User } from '../../../Core/Interfaces/User.interface';

export const usersAction = createActionGroup({
  source: 'Backend User Route',
  events: {
    'Set Current User State': props<{ userState_ngrx: User }>(),
  },
});
