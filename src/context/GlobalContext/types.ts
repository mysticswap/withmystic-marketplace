import { CollectionHistory, CollectionTraits } from "../../types/alchemy.types";
import { ethers } from "ethers";
import { CollectionMetadataV2 } from "../../types/reservoir-types/collection-metadata.types";
import { GetNftsReservoir } from "../../types/reservoir-types/collection-nfts.types";

export type GlobalContextType = {
  collectionTraits: CollectionTraits;
  setCollectionTraits: React.Dispatch<React.SetStateAction<CollectionTraits>>;
  collectionHistory: CollectionHistory;
  setCollectionHistory: React.Dispatch<React.SetStateAction<CollectionHistory>>;
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  provider: ethers.providers.Web3Provider | null;
  setProvider: React.Dispatch<
    React.SetStateAction<ethers.providers.Web3Provider | null>
  >;
  chainId: number;
  setChainId: React.Dispatch<React.SetStateAction<number>>;
  userBalance: number;
  setUserBalance: React.Dispatch<React.SetStateAction<number>>;
  tabOptions: string[];
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;

  // reservoir

  collectionMetadata: CollectionMetadataV2 | null;
  setCollectionMetadata: React.Dispatch<
    React.SetStateAction<CollectionMetadataV2 | null>
  >;
  collectionNfts: GetNftsReservoir;
  setCollectionNfts: React.Dispatch<React.SetStateAction<GetNftsReservoir>>;
};
