import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CollectionHistory,
  CollectionMetaData,
  CollectionTraits,
  SingleNftData,
} from "../types/alchemy.types";
import {
  getCollection,
  getCollectionHistory,
  getCollectionNfts,
  getCollectionOwners,
  getCollectionTraits,
} from "../services/marketplace-api";
import { apiKey, collectionContract } from "../config";
import { ethers } from "ethers";
import { metamaskPresent } from "../utils";

declare global {
  interface Window {
    ethereum: any;
  }
}

type ContextType = {
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
};

const GlobalContext = createContext<ContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<string | null>(null);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [chainId, setChainId] = useState(0);
  const [collectionMetadata, setCollectionMetadata] =
    useState<CollectionMetaData | null>(null);
  const [collectionTraits, setCollectionTraits] = useState<CollectionTraits>(
    {} as CollectionTraits
  );
  const [collectionNfts, setCollectionNfts] = useState<SingleNftData[]>([]);
  const [totalOwners, setTotalOwners] = useState(0);
  const [collectionHistory, setCollectionHistory] = useState<CollectionHistory>(
    {} as CollectionHistory
  );

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

    getCollectionHistory(collectionContract, 1, apiKey).then((result) => {
      setCollectionHistory(result);
    });
  }, []);

  useEffect(() => {
    if (provider) {
      provider.getNetwork().then((network) => {
        setChainId(network.chainId);
      });
    }
  }, [provider]);

  useEffect(() => {
    if (!user && metamaskPresent()) {
      const pro = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(pro);
    }
  }, []);

  const attachListeners = useCallback(() => {
    window.ethereum.on("accountsChanged", function (accounts: string[]) {
      if (accounts.length > 0) {
        setUser(ethers.utils.getAddress(accounts[0]));
        window.location.reload();
      } else {
        setUser(null);
      }
    });

    window.ethereum.on("chainChanged", (Id: string) => {
      window.location.reload();
      const chainId = parseInt(Id, 16);
      setChainId(chainId);
    });

    window.ethereum.on("disconnect", () => {
      setProvider(null);
      setUser(null);
    });

    provider!.on("error", () => {
      // alert(tx);
      // alert("g");
    });
  }, [provider]);

  const addUser = useCallback(async () => {
    if (provider) {
      const acc = await provider!.listAccounts(); // provider! due to if (provider) being used in useEffect
      acc.length > 0 && setUser(ethers.utils.getAddress(acc[0]));
    }
  }, [provider]);

  useEffect(() => {
    if (provider) {
      attachListeners();
      addUser();
    } else {
      // try to detect if address is already connected
      setTimeout(function () {
        if (window.ethereum && window.ethereum.selectedAddress) {
          setUser(window.ethereum && window.ethereum.selectedAddress);
          const providerTemp = new ethers.providers.Web3Provider(
            window.ethereum
          );
          setProvider(providerTemp);
        }
      }, 500);
    }
  }, [provider, addUser, attachListeners]);

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
        collectionHistory,
        setCollectionHistory,
        user,
        setUser,
        provider,
        setProvider,
        chainId,
        setChainId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
