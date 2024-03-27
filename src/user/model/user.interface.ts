import { nftId } from '../../nftid/model/nftid.interface';
import { cryptoidEntry } from '../../cryptoid/model/cryptoid.interface';
import { PostInterface } from '../../posting/models/post.interface';
import { FriendRequest } from 'src/friend-requests/Model/friendRequest.interface';

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
  sentFriendRequests?: FriendRequest[];
  recievedFriendRequests?: FriendRequest[];
  profileImage?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  CHIEFEDITOR = 'chiefeditor',
  EDITOR = 'editor',
  USER = 'user',
}
