import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getCollection,
  getCollectionHistory,
  getCollectionNfts,
  getUserBalance,
} from "../../services/api/marketplace-api";
import { API_KEY } from "../../config";
import { GlobalContextType } from "./types";
import {
  getCollectionActivity,
  getCollectionMetadata,
  getCollectionNftsV2,
  getCollectionTraitsV2,
  getUserNfts,
} from "../../services/api/marketplace-reservoir-api";
import { CollectionMetadataV2 } from "../../types/reservoir-types/collection-metadata.types";
import {
  GetNftsReservoir,
  INFT,
} from "../../types/reservoir-types/collection-nfts.types";
import {
  defaultSort,
  defaultSortby,
  reservoirActivityTypes,
  tabOptions,
} from "../../constants";
import { CollectionActivity } from "../../types/reservoir-types/collection-activity.types";
import { CollectionTraitsV2 } from "../../types/reservoir-types/collection-traits.types";
import { UserNfts } from "../../types/reservoir-types/user-nfts.types";
import { useConnectionContext } from "../ConnectionContext/ConnectionContext";
import { getHostName, getPreviousCollectionAddress } from "../../utils";
import { getEthPrice } from "../../services/api/coin-gecko.api";
import { ClientObject } from "../../types/dynamic-system.types";
import { useDisableNumberInputScroll } from "../../hooks/useDisableNumberInputScroll";
import {
  CollectionHistory,
  CollectionMetaData,
} from "../../types/alchemy.types";

const GlobalContext = createContext({} as GlobalContextType);

type Props = {
  children: ReactNode;
  client: ClientObject;
};

export const GlobalContextProvider = ({ children, client }: Props) => {
  const { user, chainId } = useConnectionContext()!;
  const availableCollections = client?.collections;
  // console.log(client);
  const previousCollection = availableCollections.find((collection) => {
    return collection.address == getPreviousCollectionAddress();
  });

  const [selectedCollection, setSelectedCollection] = useState(
    previousCollection || availableCollections[0]
  );
  const [currentTab, setCurrentTab] = useState(tabOptions[0]);
  const [collectionMetadata, setCollectionMetadata] =
    useState<CollectionMetadataV2 | null>(null);
  const [collectionMetadataOS, setCollectionMetadataOS] =
    useState<CollectionMetaData | null>(null);

  const [collectionNfts, setCollectionNfts] = useState({} as GetNftsReservoir);
  const [nftsInCollectionOS, setNftsInCollectionOS] = useState({} as INFT);

  const [collectionActivity, setCollectionActivity] = useState(
    {} as CollectionActivity
  );
  const [collectionActivityOS, setCollectionActivityOS] =
    useState<CollectionHistory | null>({} as CollectionHistory);

  const [collectionAttributes, setCollectionAttributes] = useState(
    {} as CollectionTraitsV2
  );
  const [selectedActivities, setSelectedActivities] = useState(["sale"]);
  const [userBalance, setUserBalance] = useState({});
  const [userNfts, setUserNfts] = useState({} as UserNfts);
  const [minimalCards, setMinimalCards] = useState(true);
  const [ethValue, setEthValue] = useState(0);

  const selectedActivityTypes = JSON.stringify(selectedActivities);
  console.log(selectedActivities, selectedActivityTypes);
  const source = getHostName();
  const collectionChainId = selectedCollection.chainId;
  const collectionContract = selectedCollection.address;
  // const collectionContract = "0x74cb5611e89078b2e5cb638a873cf7bddc588659";

  useEffect(() => {
    const getCollectionOS = async () => {
      const res: CollectionMetaData = await getCollection(
        collectionContract,
        collectionChainId,
        client?.apiKey
      );
      setCollectionMetadataOS(res);
    };

    const fetchCollectionActivityOS = async () => {
      const res: CollectionHistory = await getCollectionHistory(
        collectionContract,
        collectionChainId,
        client?.apiKey
      );
      setCollectionActivityOS(res);
      console.log("Activity");
    };

    const fetchNftsInCollectionOS = async () => {
      const res: INFT = await getCollectionNfts(
        collectionContract,
        collectionChainId,
        "1",
        client?.apiKey
      );
      setNftsInCollectionOS(res);
      console.log(res);
    };

    if (collectionChainId === 5) {
      getCollectionOS();
      fetchCollectionActivityOS();
      // getCollectionNfts(
      //   collectionContract,
      //   collectionChainId,
      //   "1",
      //   API_KEY
      // ).then((result) => {
      //   setNftsInCollectionOS(result);
      //   // setCollectionNfts(result);
      // });

      fetchNftsInCollectionOS();
    } else {
      getCollectionNftsV2(
        collectionChainId,
        defaultSort,
        defaultSortby,
        collectionContract
      ).then((result) => {
        setCollectionNfts(result);
      });
      getCollectionMetadata(collectionChainId, collectionContract).then(
        (result) => {
          setCollectionMetadata(result);
        }
      );
      getCollectionActivity(
        collectionChainId,
        collectionContract,
        selectedActivityTypes
      ).then((result) => {
        setCollectionActivity(result);
      });
    }

    getCollectionTraitsV2(collectionChainId, collectionContract).then(
      (result) => {
        setCollectionAttributes(result);
      }
    );
  }, [
    selectedCollection,
    collectionChainId,
    collectionContract,
    selectedActivityTypes,
    client?.apiKey,
  ]);

  useEffect(() => {
    if (selectedActivities.length < 1) {
      setSelectedActivities(JSON.parse(reservoirActivityTypes));
    }
    setCollectionActivity({} as CollectionActivity);

    const fetchCollectionActivityOS = async () => {
      const res: CollectionHistory = await getCollectionHistory(
        collectionContract,
        collectionChainId,
        client?.apiKey
      );
      setCollectionActivityOS(res);
    };

    if (collectionChainId === 1) {
      fetchCollectionActivityOS();
    } else {
      getCollectionActivity(
        collectionChainId,
        collectionContract,
        selectedActivities.length < 1
          ? reservoirActivityTypes
          : selectedActivityTypes
      ).then((result) => {
        setCollectionActivity(result);
      });
    }
  }, [
    selectedActivities,
    collectionChainId,
    collectionContract,
    selectedActivityTypes,
    client.apiKey,
  ]);

  useEffect(() => {
    if (user && collectionChainId) {
      getUserNfts(collectionChainId, user, collectionContract).then(
        (result) => {
          setUserNfts(result);
        }
      );
    }
  }, [user, collectionMetadata, collectionChainId, collectionContract]);

  useEffect(() => {
    if (user) {
      getUserBalance(user!, collectionChainId, API_KEY).then((result) => {
        setUserBalance(result);
      });
    }
  }, [user, chainId, collectionChainId, selectedCollection]);

  useEffect(() => {
    localStorage.setItem(
      "current-collection",
      JSON.stringify(selectedCollection.address)
    );
  }, [selectedCollection]);

  useEffect(() => {
    getEthPrice().then((result) => {
      setEthValue(result.ethereum.usd);
    });
  }, []);

  useDisableNumberInputScroll();

  return (
    <GlobalContext.Provider
      value={{
        collectionMetadata,
        setCollectionMetadata,
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
        userNfts,
        setUserNfts,
        minimalCards,
        setMinimalCards,
        source,
        collectionChainId,
        availableCollections,
        selectedCollection,
        setSelectedCollection,
        collectionContract,
        ethValue,
        client,
        nftsInCollectionOS,
        setNftsInCollectionOS,
        collectionMetadataOS,
        setCollectionMetadataOS,
        collectionActivityOS,
        setCollectionActivityOS,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === undefined)
    throw new Error("GlobalContext was used outside the GlobalProvider");
  return context;
};
