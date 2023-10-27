import { CollectionMetadataV2 } from "../../types/reservoir-types/collection-metadata.types";
import { GetNftsReservoir } from "../../types/reservoir-types/collection-nfts.types";
import { CollectionActivity } from "../../types/reservoir-types/collection-activity.types";
import { CollectionTraitsV2 } from "../../types/reservoir-types/collection-traits.types";
import { UserNfts } from "../../types/reservoir-types/user-nfts.types";

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
  selectedActivities: string[];
  setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>;
  userNfts: UserNfts;
  setUserNfts: React.Dispatch<React.SetStateAction<UserNfts>>;
  source: string;
};
