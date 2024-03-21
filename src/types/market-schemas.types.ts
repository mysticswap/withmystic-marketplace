enum NftTokenType {
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
  NO_SUPPORTED_NFT_STANDARD = "NO_SUPPORTED_NFT_STANDARD",
  NOT_A_CONTRACT = "NOT_A_CONTRACT",
  any = "any",
}

export interface signedOrderToMongo {
  orderComponents: ListOrOfferType;
  signature: string;
  chainId: number;
  creatorAddress: string;
  takerAddress: string;
  clientId: string;
  metadata: any;
  type: SwapType;
  domain: string;
}

interface NftMetadata extends Record<string, any> {
  name?: string;
  description?: string;
  image?: string;

  external_url?: string;
  background_color?: string;
  attributes?: Array<Record<string, any>>;
}

interface OpenSeaCollectionMetadata {
  floorPrice?: number;
  collectionName?: string;
  imageUrl?: string;
  description?: string;
  externalUrl?: string;
  twitterUsername?: string;
  discordUrl?: string;
  lastIngestedAt?: string;
}

interface NftContract {
  tokenType: NftTokenType;
  name?: string;
  symbol?: string;
  address?: string;
  totalSupply?: string;
  openSea?: OpenSeaCollectionMetadata;
  contractDeployer?: string;
  deployedBlockNumber?: number;
}

type Items = {
  itemtype?: string;
  token?: string;
  identifier?: string;
  identifierOrCriteria?: string;
  amount: string;
  recipient?: string;
};

export interface Nft {
  contract: NftContract;
  tokenId: string;
  tokenType: NftTokenType;
  title: string;
  description: string;
  timeLastUpdated: string;
  metadataError: string | undefined;
  media: any[];
  rawMetadata?: NftMetadata;
  tokenUri: any;
}

export enum SwapType {
  Swap = "swap",
  Listing = "listing",
  Offer = "offer",
}

export enum AuctionEnumType {
  Dutch = "dutch",
  Basic = "basic",
  Advanced = "advanced",
}

export type ListOrOfferType = {
  endTime?: string;
  chainId?: number;
  offerer: string;
  offer: Items[];
  consideration: Items[];
  takerAddress?: string;
  creatorAddress?: string;
  type?: SwapType;
  domain?: string;
  fees?: string;
};

export type AuctionType = {
  endTime: string;
  startAmount: string;
  startTime?: string;
  endAmount?: string;
  chainId?: number;
  offerer: string;
  offer: Items[];
  creatorAddress?: string;
  type?: AuctionEnumType;
  fees?: string;
};

export interface NftContractNftsResponse {
  nfts: Nft[];
  pageKey?: string;
}

export type PayloadVerify = {
  signature: string;
  swapId: string;
};

export interface AcceptSwapDto {
  swapId: string;
  takerAddress: string;
  // offerCriteria?: any[];
  // considerationCriteria?: InputCriteria[];
}

export interface NativeCollections {
  nfts: Nft[];
}
