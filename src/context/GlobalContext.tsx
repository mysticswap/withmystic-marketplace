import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CollectionMetaData, SingleNftData } from "../types/alchemy.types";
import { getCollection, getCollectionNfts } from "../services/marketplace-api";
import { apiKey, collectionContract } from "../config";

type ContextType = {
  collectionMetadata: CollectionMetaData | null;
  setCollectionMetadata: Dispatch<SetStateAction<CollectionMetaData | null>>;
  collectionNfts: SingleNftData[];
  setCollectionNfts: React.Dispatch<React.SetStateAction<SingleNftData[]>>;
};

const GlobalContext = createContext<ContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [collectionMetadata, setCollectionMetadata] =
    useState<CollectionMetaData | null>(null);
  const [collectionNfts, setCollectionNfts] = useState<SingleNftData[]>([]);

  useEffect(() => {
    getCollection(collectionContract, 1, apiKey).then((result) => {
      setCollectionMetadata(result);
    });

    getCollectionNfts(collectionContract, 1, 1, apiKey).then((result) => {
      setCollectionNfts(result.nfts);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        collectionMetadata,
        setCollectionMetadata,
        collectionNfts,
        setCollectionNfts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
