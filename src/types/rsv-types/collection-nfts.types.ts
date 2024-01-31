/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GetNftsRsv {
  tokens: TokenElement[];
  continuation: string | null;
}

export interface TokenElement {
  token: TokenToken;
  market: Market;
  updatedAt: Date;
}

export interface Market {
  floorAsk: FloorAsk;
}

export interface FloorAsk {
  id: string;
  price: FloorAskPrice;
  maker: string;
  validFrom: number;
  validUntil: number;
  source: Source;
}

export interface FloorAskPrice {
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

export interface Source {
  id: string;
  domain: string;
  name: string;
  icon: string;
  url: string;
}

export interface TokenToken {
  chainId: number;
  contract: string;
  tokenId: string;
  name: string;
  description: string;
  image: string;
  optImage?: string;
  imageSmall: string;
  imageLarge: string;
  metadata: Metadata;
  media: null | any;
  kind: string;
  isFlagged: boolean;
  lastFlagUpdate: Date;
  lastFlagChange: Date | null;
  supply: string;
  remainingSupply: string;
  rarity: number;
  rarityRank: number;
  collection: Collection;
  lastSale: LastSale;
  owner: string;
  attributes?: NftAttributes[];
}

export interface Collection {
  id: string;
  name: string;
  image: string;
  slug: string;
  creator: string;
  tokenCount: number;
}

export interface LastSale {
  orderSource: string;
  fillSource: string;
  timestamp: number;
  price: LastSalePrice;
  royaltyFeeBps?: number;
  paidFullRoyalty?: boolean;
  feeBreakdown?: FeeBreakdown[];
}

export interface FeeBreakdown {
  kind: string;
  bps: number;
  recipient: string;
  rawAmount: string;
}

export interface LastSalePrice {
  currency: Currency;
  amount: Amount;
  netAmount?: Amount;
}

export interface Metadata {
  imageOriginal: string;
}

export interface NftAttributes {
  key: string;
  kind: string;
  value: string;
  tokenCount: number;
  onSaleCount: number;
  floorAskPrice: number;
  topBidValue: null;
  createdAt: Date;
}
