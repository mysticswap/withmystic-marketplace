import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserBalance } from "../../services/marketplace-api";
import { API_KEY, collectionContract } from "../../config";
import { ethers } from "ethers";
import { metamaskPresent } from "../../utils";
import { GlobalContextType } from "./types";
import {
  getCollectionActivity,
  getCollectionMetadata,
  getCollectionNftsV2,
  getCollectionTraitsV2,
} from "../../services/marketplace-reservoir-api";
import { CollectionMetadataV2 } from "../../types/reservoir-types/collection-metadata.types";
import { GetNftsReservoir } from "../../types/reservoir-types/collection-nfts.types";
import { reservoirActivityTypes, tabOptions } from "../../constants";
import { CollectionActivity } from "../../types/reservoir-types/collection-activity.types";
import { CollectionTraitsV2 } from "../../types/reservoir-types/collection-traits.types";

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
  const [chainId, setChainId] = useState(1);
  const [currentTab, setCurrentTab] = useState(tabOptions[0]);
  const [collectionMetadata, setCollectionMetadata] =
    useState<CollectionMetadataV2 | null>(null);
  const [collectionNfts, setCollectionNfts] = useState({} as GetNftsReservoir);
  const [collectionActivity, setCollectionActivity] = useState(
    {} as CollectionActivity
  );
  const [collectionAttributes, setCollectionAttributes] = useState(
    {} as CollectionTraitsV2
  );
  const [selectedActivities, setSelectedActivities] = useState(["sale"]);

  const [userBalance, setUserBalance] = useState(0);

  const defaultSort = "floorAskPrice";
  const defaultSortby = "asc";
  const selectedActivityTypes = JSON.stringify(selectedActivities);

  useEffect(() => {
    getCollectionMetadata(chainId, collectionContract).then((result) => {
      setCollectionMetadata(result);
    });

    getCollectionNftsV2(
      chainId,
      defaultSort,
      defaultSortby,
      collectionContract
    ).then((result) => {
      setCollectionNfts(result);
    });

    getCollectionActivity(
      chainId,
      collectionContract,
      selectedActivityTypes
    ).then((result) => {
      setCollectionActivity(result);
    });

    getCollectionTraitsV2(chainId, collectionContract).then((result) => {
      setCollectionAttributes(result);
    });
  }, []);

  useEffect(() => {
    if (selectedActivities.length < 1) {
      setSelectedActivities(JSON.parse(reservoirActivityTypes));
    }
    setCollectionActivity({} as CollectionActivity);
    getCollectionActivity(
      chainId,
      collectionContract,
      selectedActivities.length < 1
        ? reservoirActivityTypes
        : selectedActivityTypes
    ).then((result) => {
      setCollectionActivity(result);
    });
  }, [selectedActivities]);

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
    if (user) {
      getUserBalance(user!, chainId, API_KEY).then((result) => {
        setUserBalance(Number(result));
      });
    }
  }, [user, chainId]);

  return (
    <GlobalContext.Provider
      value={{
        collectionMetadata,
        setCollectionMetadata,
        user,
        setUser,
        provider,
        setProvider,
        chainId,
        setChainId,
        userBalance,
        setUserBalance,
        currentTab,
        setCurrentTab,
        collectionNfts,
        setCollectionNfts,
        collectionActivity,
        setCollectionActivity,
        collectionAttributes,
        setCollectionAttributes,
        selectedActivities,
        setSelectedActivities,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
