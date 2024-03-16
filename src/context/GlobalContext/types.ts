import { CollectionMetadataV2 } from "../../types/rsv-types/collection-metadata.types";
import { GetNftsRsv } from "../../types/rsv-types/collection-nfts.types";
import { CollectionActivity } from "../../types/rsv-types/collection-activity.types";
import { CollectionTraitsV2 } from "../../types/rsv-types/collection-traits.types";
import { UserNfts } from "../../types/rsv-types/user-nfts.types";
import {
  ClientObject,
  MarketplaceClientCollection,
  SupportedToken,
} from "../../types/dynamic-system.types";

export type GlobalContextType = {
  userBalance: { [x: string]: string };
  setUserBalance: React.Dispatch<React.SetStateAction<{ [x: string]: string }>>;
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  minimalCards: boolean;
  setMinimalCards: React.Dispatch<React.SetStateAction<boolean>>;
  collectionMetadata: CollectionMetadataV2 | null;
  setCollectionMetadata: React.Dispatch<
    React.SetStateAction<CollectionMetadataV2 | null>
  >;
  collectionNfts: GetNftsRsv;
  setCollectionNfts: React.Dispatch<React.SetStateAction<GetNftsRsv>>;
  collectionActivity: CollectionActivity;
  setCollectionActivity: React.Dispatch<
    React.SetStateAction<CollectionActivity>
  >;
  collectionAttributes: CollectionTraitsV2;
  setCollectionAttributes: React.Dispatch<
    React.SetStateAction<CollectionTraitsV2>
  >;
  selectedActivities: string[];
  setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>;
  userNfts: UserNfts;
  setUserNfts: React.Dispatch<React.SetStateAction<UserNfts>>;
  source: string;
  collectionChainId: number;
  availableCollections: MarketplaceClientCollection[];
  selectedCollection: MarketplaceClientCollection;
  setSelectedCollection: React.Dispatch<
    React.SetStateAction<MarketplaceClientCollection>
  >;
  collectionContract: string;
  activitiesFetching: boolean;
  cryptoValue: number;
  client: ClientObject;
  supportedTokens: SupportedToken[];
  currentToken: number;
  setCurrentToken: React.Dispatch<React.SetStateAction<number>>;
  selectedToken: any;
  setSelectedToken: React.Dispatch<React.SetStateAction<any>>;
  isAuction: boolean;
  setIsAuction: React.Dispatch<React.SetStateAction<boolean>>;
  listView: boolean;
  setListView: React.Dispatch<React.SetStateAction<boolean>>;
};
