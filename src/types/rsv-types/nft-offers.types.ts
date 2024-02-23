export interface NftOffers {
  orders: Offer[];
  continuation: null;
}

export interface Offer {
  _id?:string,
  id?: string;
  swapId?: string;
  kind: string;
  side: string;
  status: string;
  tokenSetId: string;
  tokenSetSchemaHash: string;
  contract: string;
  contractKind: string;
  maker: string;
  taker: string;
  price: Price;
  validFrom: number;
  validUntil: number;
  quantityFilled: number;
  quantityRemaining: number;
  criteria: Criteria;
  source: Source;
  feeBps: number;
  feeBreakdown: FeeBreakdown[];
  expiration: number;
  isReservoir: null;
  createdAt: Date;
  updatedAt: Date;
  originatedAt: Date;
}

export interface Criteria {
  kind: string;
  data: Data;
}

export interface Data {
  collection: Collection;
}

export interface Collection {
  id: string;
}

export interface FeeBreakdown {
  bps: number;
  kind: string;
  recipient: string;
}

export interface Price {
  currency: Currency;
  amount: Amount;
  netAmount: Amount;
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

export interface Source {
  id: string;
  domain: string;
  name: string;
  icon: string;
  url: string;
}
