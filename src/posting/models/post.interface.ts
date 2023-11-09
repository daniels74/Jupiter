import { User } from '../../user/model/user.interface';

export interface PostInterface {
  id?: number;
  description?: string;
  user?: User;
}
