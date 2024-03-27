import { Post } from './post';
import { NFTId } from './singleNFT';
import { CryptoId } from './top-trending';

export interface Surfer {
  id: number;
  name: string;
  username: string;
  cryptos?: CryptoId[];
  nfts?: NFTId[];
  posts?: Post[];
  profileImage?: string;
}
