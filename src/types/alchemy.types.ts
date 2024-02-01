export interface CollectionMetaData {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  tokenType: string;
  openSea: OpenSea;
  contractDeployer: string;
  deployedBlockNumber: number;
}

export interface OpenSea {
  floorPrice?: number;
  collectionName?: string;
  safelistRequestStatus?: string;
  imageUrl?: string;
  description?: string;
  externalUrl?: string;
  twitterUsername?: string;
  discordUrl?: string;
  lastIngestedAt?: Date;
}

export interface SingleNftData {
  contract: Contract;
  tokenId: string;
  tokenType: string;
  title: string;
  description: string;
  timeLastUpdated: Date;
  rawMetadata: RawMetadata;
  tokenUri: TokenURI;
  media: Media[];
}

export interface Contract {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string;
  tokenType: string;
  openSea: OpenSea;
  contractDeployer: string;
  deployedBlockNumber: number;
}

export interface Media {
  gateway: string;
  thumbnail: string;
  raw: string;
  format: string;
  bytes: number;
}

export interface RawMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}

export interface Attribute {
  value: string;
  trait_type: string;
}

export interface TokenURI {
  gateway: string;
  raw: string;
}

export interface CollectionTraits {
  [key: string]: { [key: string]: number };
}

export interface NftSale {
  marketplace: string;
  contractAddress: string;
  tokenId: string;
  quantity: string;
  buyerAddress: string;
  sellerAddress: string;
  taker: string;
  sellerFee: Fee;
  marketplaceFee: Fee;
  protocolFee: Fee;
  royaltyFee: RoyaltyFee;
  blockNumber: number;
  logIndex: number;
  bundleIndex: number;
  transactionHash: string;
  tokenMetadata: SingleNftData;
  timestamp: number;
}

export interface Fee {
  amount: string;
  tokenAddress: string;
  symbol: string;
  decimals: number;
}

export interface RoyaltyFee {}

export interface ValidAt {
  blockNumber: number;
  blockHash: string;
  blockTimestamp: Date;
}

export interface CollectionHistory {
  nftSales: NftSale[];
  pageKey: string;
}

export interface SingleNftHistory {
  tokenMetada: SingleNftData;
  transactions: NftSale[];
}

export interface NFTHistory {
  transactions: Transaction[];
}

export interface Transaction {
  marketplace: string;
  contractAddress: string;
  tokenId: string;
  quantity: string;
  buyerAddress: string;
  sellerAddress: string;
  taker: string;
  sellerFee: SellerFee;
  marketplaceFee: MarketplaceFee;
  protocolFee: ProtocolFee;
  royaltyFee: RoyaltyFee;
  blockNumber: number;
  logIndex: number;
  bundleIndex: number;
  transactionHash: string;
  timestamp: number;
}

export interface SellerFee {
  amount: string;
  tokenAddress: string;
  symbol: string;
  decimals: number;
}

export interface MarketplaceFee {
  amount: string;
  tokenAddress: string;
  symbol: string;
  decimals: number;
}

export interface ProtocolFee {
  amount: string;
  tokenAddress: string;
  symbol: string;
  decimals: number;
}

export interface RoyaltyFee {
  amount: string;
  tokenAddress: string;
  symbol: string;
  decimals: number;
}
