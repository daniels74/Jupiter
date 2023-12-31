import { User } from './User.interface';

export interface TopTrending {
  coins?: CryptoCoinObj[] | null;
  nfts?: NFT[] | null;
  exchanges?: null[] | null;
}
export interface CryptoCoinObj {
  item: Crypto;
}
export interface Crypto {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
}
export interface NFT {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  nft_contract_id: number;
}

export interface CryptoId {
  id: number;
  cryptoid: string;
  user: User;
}
