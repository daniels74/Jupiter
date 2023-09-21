export interface SingleCoin {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: string;
  platforms: any;
  detail_platforms: any;
  block_time_in_minutes: number;
  hashing_algorithm: null | any;
  categories: string[];
  preview_listing: boolean;
  public_notice: null | any;
  additional_notices: any;
  localization: any;
  description: any;
  links: any;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: null | any;
  contract_address: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: any;
  collectionId: number;
}
