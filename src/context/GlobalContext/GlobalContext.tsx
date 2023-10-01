import {
  ReactNode,
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
} from "../../types/alchemy.types";
import {
  getCollection,
  getCollectionHistory,
  getCollectionNfts,
  getCollectionOwners,
  getCollectionTraits,
  getUserBalance,
} from "../../services/marketplace-api";
import { API_KEY, collectionContract } from "../../config";
import { ethers } from "ethers";
import { metamaskPresent } from "../../utils";
import { GlobalContextType } from "./types";
import { getCollectionMetadata } from "../../services/marketplace-reservoir-api";
import { CollectionMetadata2 } from "../../types/reservoir-types/collection-metadata.types";

declare global {
  interface Window {
    ethereum: any;
  }
}

const GlobalContext = createContext<GlobalContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<string | null>(null);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [chainId, setChainId] = useState(0);
  const tabOptions = ["Items", "Activity"];
  const [currentTab, setCurrentTab] = useState(tabOptions[0]);
  const [collectionMetadata, setCollectionMetadata] =
    useState<CollectionMetaData | null>(null);
  const [collectionTraits, setCollectionTraits] = useState<CollectionTraits>(
    {} as CollectionTraits
  );
  const [collectionNfts, setCollectionNfts] = useState<SingleNftData[]>([]);
  const [nftsPageKey, setNftsPageKey] = useState("");
  const [totalOwners, setTotalOwners] = useState(0);
  const [collectionHistory, setCollectionHistory] = useState<CollectionHistory>(
    {} as CollectionHistory
  );
  const [userBalance, setUserBalance] = useState(0);

  const [collectionMetadata2, setCollectionMetadata2] =
    useState<CollectionMetadata2 | null>(null);

  useEffect(() => {
    getCollection(collectionContract, 1, API_KEY).then((result) => {
      setCollectionMetadata(result);
    });

    getCollectionMetadata(1, collectionContract).then((result) => {
      setCollectionMetadata2(result);
    });

    getCollectionTraits(collectionContract, 1, API_KEY).then((result) => {
      setCollectionTraits(result.traits);
    });

    getCollectionNfts(collectionContract, 1, "1", API_KEY).then((result) => {
      setCollectionNfts(result.nfts);
      setNftsPageKey(result.pageKey);
    });

    getCollectionOwners(collectionContract, 1, API_KEY).then((result) => {
      setTotalOwners(result.totalOwners);
    });

    getCollectionHistory(collectionContract, 1, API_KEY).then((result) => {
      setCollectionHistory({
        nftSales: result.nftSales,
        pageKey: result.pageKey,
      });
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

  useEffect(() => {
    getUserBalance(user!, chainId, API_KEY).then((result) => {
      setUserBalance(Number(result));
    });
  }, [user, chainId]);

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
        userBalance,
        setUserBalance,
        nftsPageKey,
        setNftsPageKey,
        currentTab,
        setCurrentTab,
        tabOptions,
        collectionMetadata2,
        setCollectionMetadata2,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
