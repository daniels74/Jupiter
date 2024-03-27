import { User } from 'src/user/model/user.interface';

export interface FriendRequest {
  id?: number;
  creator?: User;
  reciever?: User;
  status?: string;
}
