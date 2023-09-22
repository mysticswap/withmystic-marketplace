import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CollectionMetaData,
  CollectionTraits,
  SingleNftData,
} from "../types/alchemy.types";
import {
  getCollection,
  getCollectionNfts,
  getCollectionOwners,
  getCollectionTraits,
} from "../services/marketplace-api";
import { apiKey, collectionContract } from "../config";

type ContextType = {
  collectionMetadata: CollectionMetaData | null;
  setCollectionMetadata: Dispatch<SetStateAction<CollectionMetaData | null>>;
  collectionNfts: SingleNftData[];
  setCollectionNfts: React.Dispatch<React.SetStateAction<SingleNftData[]>>;
  collectionTraits: CollectionTraits;
  setCollectionTraits: React.Dispatch<React.SetStateAction<CollectionTraits>>;
  totalOwners: number;
  setTotalOwners: React.Dispatch<React.SetStateAction<number>>;
};

const GlobalContext = createContext<ContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [collectionMetadata, setCollectionMetadata] =
    useState<CollectionMetaData | null>(null);
  const [collectionTraits, setCollectionTraits] = useState<CollectionTraits>(
    {} as CollectionTraits
  );
  const [collectionNfts, setCollectionNfts] = useState<SingleNftData[]>([]);
  const [totalOwners, setTotalOwners] = useState(0);

  useEffect(() => {
    getCollection(collectionContract, 1, apiKey).then((result) => {
      setCollectionMetadata(result);
    });

    getCollectionTraits(collectionContract, 1, apiKey).then((result) => {
      setCollectionTraits(result.traits);
    });

    getCollectionNfts(collectionContract, 1, 1, apiKey).then((result) => {
      setCollectionNfts(result.nfts);
    });

    getCollectionOwners(collectionContract, 1, apiKey).then((result) => {
      setTotalOwners(result.totalOwners);
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        collectionMetadata,
        setCollectionMetadata,
        collectionNfts,
        setCollectionNfts,
        collectionTraits,
        setCollectionTraits,
        totalOwners,
        setTotalOwners,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
