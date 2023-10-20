export interface UserNfts {
  tokens: UserTokenElement[];
  continuation: null | string;
}

export interface UserTokenElement {
  token: TokenToken;
  ownership: Ownership;
}

export interface Ownership {
  tokenCount: string;
  onSaleCount: string;
  floorAsk: FloorAsk;
  acquiredAt: Date;
}

export interface FloorAsk {
  id: null | string;
  price: null | string;
  maker: null | string;
  kind: null | string;
  validFrom: null | string;
  validUntil: null | string;
  source: null | string;
}

export interface TokenToken {
  chainId: number;
  contract: string;
  tokenId: string;
  kind: string;
  name: string;
  image: string;
  imageSmall: string;
  imageLarge: string;
  rarityScore: number;
  rarityRank: number;
  supply: string;
  remainingSupply: string;
  media: any;
  isFlagged: boolean;
  lastFlagUpdate: any;
  lastFlagChange: any;
  collection: Collection;
  lastAppraisalValue: any;
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

export interface Royalty {
  bps: number;
  recipient: string;
}
