export interface CollectionMetadata {
  collections: Collection[];
}

export interface Collection {
  chainId: number;
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  image: string;
  banner: string;
  discordUrl: string;
  externalUrl: string;
  twitterUsername: string;
  openseaVerificationStatus: string;
  description: string;
  sampleImages: string[];
  tokenCount: string;
  onSaleCount: string;
  primaryContract: string;
  tokenSetId: string;
  creator: string;
  royalties: Royalties;
  allRoyalties: AllRoyalties;
  floorAsk: FloorAsk;
  topBid: TopBid;
  rank: { [key: string]: number };
  volume: { [key: string]: number };
  volumeChange: { [key: string]: number };
  floorSale: { [key: string]: number };
  floorSaleChange: { [key: string]: number };
  collectionBidSupported: boolean;
  ownerCount: number;
  contractKind: string;
  mintedTimestamp: null | any;
  mintStages: any[];
}

export interface AllRoyalties {
  eip2981: Eip2981[];
  onchain: Eip2981[];
  opensea: Eip2981[];
}

export interface Eip2981 {
  bps: number;
  recipient: string;
}

export interface FloorAsk {
  id: string;
  sourceDomain: string;
  price: FloorAskPrice;
  maker: string;
  validFrom: number;
  validUntil: number;
  token: Token;
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

export interface Token {
  contract: string;
  tokenId: string;
  name: string;
  image: string;
}

export interface Royalties {
  recipient: string;
  breakdown: Eip2981[];
  bps: number;
}

export interface TopBid {
  id: string;
  sourceDomain: string;
  price: TopBidPrice;
  maker: string;
  validFrom: number;
  validUntil: number;
}

export interface TopBidPrice {
  currency: Currency;
  amount: Amount;
  netAmount: Amount;
}
