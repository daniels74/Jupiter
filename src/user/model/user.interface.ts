import { cryptoidEntry } from '../../cryptoid/model/cryptoid.interface';

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  cryptos?: cryptoidEntry[];
}

export enum UserRole {
  ADMIN = 'admin',
  CHIEFEDITOR = 'chiefeditor',
  EDITOR = 'editor',
  USER = 'user',
}
