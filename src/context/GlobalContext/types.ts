import { ethers } from "ethers";
import { CollectionMetadataV2 } from "../../types/reservoir-types/collection-metadata.types";
import { GetNftsReservoir } from "../../types/reservoir-types/collection-nfts.types";
import { CollectionActivity } from "../../types/reservoir-types/collection-activity.types";
import { CollectionTraitsV2 } from "../../types/reservoir-types/collection-traits.types";

export type GlobalContextType = {
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
  collectionActivity: CollectionActivity;
  setCollectionActivity: React.Dispatch<
    React.SetStateAction<CollectionActivity>
  >;
  collectionAttributes: CollectionTraitsV2;
  setCollectionAttributes: React.Dispatch<
    React.SetStateAction<CollectionTraitsV2>
  >;
};
