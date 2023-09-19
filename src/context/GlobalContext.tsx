import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { CollectionMetaData, SingleNftData } from "../types/alchemy.types";

type ContextType = {
  collectionMetadataState?: {
    collectionMetadata: CollectionMetaData | null;
    setCollectionMetadata: Dispatch<SetStateAction<CollectionMetaData | null>>;
  };
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  tabOptions: string[];
  collectionNftsState?: {
    collectionNfts: SingleNftData[];
    setCollectionNfts: React.Dispatch<React.SetStateAction<SingleNftData[]>>;
  };
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  minimalCards: boolean;
  setMinimalCards: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalContext = createContext<ContextType | null>(null);

type Props = {
  children: ReactNode;
  collectionMetadataState?: {
    collectionMetadata: CollectionMetaData | null;
    setCollectionMetadata: Dispatch<SetStateAction<CollectionMetaData | null>>;
  };
  collectionNftsState?: {
    collectionNfts: SingleNftData[];
    setCollectionNfts: React.Dispatch<React.SetStateAction<SingleNftData[]>>;
  };
};

export const GlobalContextProvider = ({
  children,
  collectionMetadataState,
  collectionNftsState,
}: Props) => {
  const tabOptions = ["Items", "Activity"];
  const [currentTab, setCurrentTab] = useState(tabOptions[0]);
  const [minimalCards, setMinimalCards] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  return (
    <GlobalContext.Provider
      value={{
        collectionMetadataState,
        currentTab,
        setCurrentTab,
        tabOptions,
        collectionNftsState,
        showFilters,
        setShowFilters,
        minimalCards,
        setMinimalCards,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
