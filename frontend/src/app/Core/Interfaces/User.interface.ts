import { CryptoId } from './top-trending';

export interface User {
  email: string;
  id: number;
  name: string;
  role: string;
  username: string;
  cryptos: CryptoId[];
}
