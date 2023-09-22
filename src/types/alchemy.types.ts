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
