import { createActionGroup, props } from '@ngrx/store';

export const authAction = createActionGroup({
  source: 'Login Logout',
  events: {
    'Set Authentication State': props<{ authState_ngrx: boolean }>(),
  },
});
