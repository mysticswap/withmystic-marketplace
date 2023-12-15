export interface UserNfts {
  tokens: UserTokenElement[];
  continuation: any;
}

export interface UserTokenElement {
  token: Token2;
  ownership: Ownership;
}

export interface Token2 {
  chainId: number;
  contract: string;
  tokenId: string;
  kind: string;
  name: string;
  image: string;
  imageSmall: string;
  imageLarge: string;
  rarityScore: any;
  rarityRank: any;
  supply: string;
  remainingSupply: string;
  media: any;
  isFlagged: boolean;
  lastFlagUpdate: any;
  lastFlagChange: any;
  collection: Collection;
  lastSale?: LastSale;
  lastAppraisalValue: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  openseaVerificationStatus: string;
  floorAskPrice: FloorAskPrice;
  royaltiesBps: number;
  royalties: Royalty[];
}

export interface FloorAskPrice {
  currency: Currency;
  amount: Amount;
}

export interface Currency {
  contract: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface Amount {
  raw: string;
  decimal: number;
  usd: number;
  native: number;
}

export interface Royalty {
  bps: number;
  recipient: string;
}

export interface LastSale {
  orderSource: any;
  fillSource: any;
  timestamp: number;
  price: Price;
  royaltyFeeBps: number;
  marketplaceFeeBps: number;
  paidFullRoyalty: boolean;
  feeBreakdown: FeeBreakdown[];
}

export interface Price {
  currency: Currency2;
  amount: Amount2;
  netAmount: NetAmount;
}

export interface Currency2 {
  contract: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface Amount2 {
  raw: string;
  decimal: number;
  usd: number;
  native: number;
}

export interface NetAmount {
  raw: string;
  decimal: number;
  usd: number;
  native: number;
}

export interface FeeBreakdown {
  kind: string;
  bps: number;
  recipient: string;
  rawAmount: string;
  source?: string;
}

export interface Ownership {
  tokenCount: string;
  onSaleCount: string;
  floorAsk: FloorAsk;
  acquiredAt: string;
}

export interface FloorAsk {
  id: any;
  price: any;
  maker: any;
  kind: any;
  validFrom: any;
  validUntil: any;
  source: any;
}
