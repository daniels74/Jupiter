import { createFeatureSelector } from '@ngrx/store';
import { User } from '../../../Core/Interfaces/User.interface';

export const selectUser = createFeatureSelector<User>('userState_ngrx');
