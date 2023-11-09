import { nftId } from '../../nftid/model/nftid.interface';
import { cryptoidEntry } from '../../cryptoid/model/cryptoid.interface';
import { PostInterface } from '../../posting/models/post.interface';

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  cryptos?: cryptoidEntry[];
  nfts?: nftId[];
  posts?: PostInterface[];
}

export enum UserRole {
  ADMIN = 'admin',
  CHIEFEDITOR = 'chiefeditor',
  EDITOR = 'editor',
  USER = 'user',
}
