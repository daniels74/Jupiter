import { User } from './User.interface';

export interface Post {
  id?: number;
  description?: string;
  user?: User;
}
