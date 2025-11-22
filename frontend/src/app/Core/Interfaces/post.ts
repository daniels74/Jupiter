import { User } from './User.interface';

export interface Note {
  id?: number;
  description?: string;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
}
