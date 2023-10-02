export interface CollectionActivity {
  activities: Activity[];
  continuation: string;
}

export interface Activity {
  type: Type;
  fromAddress: string;
  toAddress: string | null;
  price: Price;
  amount: number;
  timestamp: number;
  createdAt: Date;
  contract: string;
  token: ActivityToken;
  collection: ActivityCollection;
  order: Order;
}

export interface ActivityCollection {
  collectionId: string;
  collectionName: string;
  collectionImage: string;
}

export interface Order {
  id: string;
  side: Type;
  source: Source;
  criteria: Criteria;
}

export interface Criteria {
  kind: string;
  data: Data;
}

export interface Data {
  collection: DataCollection;
  token: DataToken;
}

export interface DataCollection {
  id: string;
  name: string;
  image: string;
}

export interface DataToken {
  tokenId: string;
  name: string;
  image: string;
}

export enum Type {
  Ask = "ask",
  Bid = "bid",
  Transfer = "transfer",
  Sale = "sale",
  Mint = "mint",
}

export interface Source {
  domain: string;
  name: string;
  icon: string;
}

export interface Price {
  currency: Currency;
  amount: Amount;
}

export interface Amount {
  raw: string;
  decimal: number;
  usd: number;
  native: number;
}

export interface Currency {
  contract: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface ActivityToken {
  tokenId: string;
  tokenName: string;
  tokenImage: string;
}
