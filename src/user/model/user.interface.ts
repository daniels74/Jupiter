import { nftId } from 'src/nftid/model/nftid.interface';
import { cryptoidEntry } from '../../cryptoid/model/cryptoid.interface';

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  cryptos?: cryptoidEntry[];
  nfts?: nftId[];
}

export enum UserRole {
  ADMIN = 'admin',
  CHIEFEDITOR = 'chiefeditor',
  EDITOR = 'editor',
  USER = 'user',
}
