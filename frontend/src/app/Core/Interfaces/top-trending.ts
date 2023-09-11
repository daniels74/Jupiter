export interface TopTrending {
  coins?: CoinsEntity[] | null;
  nfts?: NftsEntity[] | null;
  exchanges?: null[] | null;
}
export interface CoinsEntity {
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
export interface NftsEntity {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  nft_contract_id: number;
}
