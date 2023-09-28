import { Dispatch, SetStateAction } from "react";
import {
  CollectionHistory,
  CollectionMetaData,
  CollectionTraits,
  SingleNftData,
} from "../../types/alchemy.types";
import { ethers } from "ethers";

export type GlobalContextType = {
  collectionMetadata: CollectionMetaData | null;
  setCollectionMetadata: Dispatch<SetStateAction<CollectionMetaData | null>>;
  collectionNfts: SingleNftData[];
  setCollectionNfts: React.Dispatch<React.SetStateAction<SingleNftData[]>>;
  collectionTraits: CollectionTraits;
  setCollectionTraits: React.Dispatch<React.SetStateAction<CollectionTraits>>;
  totalOwners: number;
  setTotalOwners: React.Dispatch<React.SetStateAction<number>>;
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
  nftsPageKey: string;
  setNftsPageKey: React.Dispatch<React.SetStateAction<string>>;
  tabOptions: string[];
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};
