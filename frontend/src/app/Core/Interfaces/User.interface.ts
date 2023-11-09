import { Post } from './post';
import { NFTId } from './singleNFT';
import { CryptoId } from './top-trending';

export interface User {
  email: string;
  id: number;
  name: string;
  role: string;
  username: string;
  cryptos: CryptoId[];
  nfts: NFTId[];
  posts: Post[];
}
