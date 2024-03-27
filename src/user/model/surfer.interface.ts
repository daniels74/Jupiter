import { cryptoidEntry } from 'src/cryptoid/model/cryptoid.interface';
import { nftId } from 'src/nftid/model/nftid.interface';
import { PostInterface } from 'src/posting/models/post.interface';

export interface Surfer {
  id: number;
  name: string;
  username: string;
  cryptos?: cryptoidEntry[];
  nfts?: nftId[];
  posts?: PostInterface[];
  profileImage?: string;
}
