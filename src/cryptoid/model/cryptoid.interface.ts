import { User } from '../../user/model/user.interface';

export interface cryptoidEntry {
  id?: number;
  cryptoid?: string;
  user?: User;
}
