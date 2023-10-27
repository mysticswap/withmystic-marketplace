import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserBalance } from "../../services/api/marketplace-api";
import { API_KEY, collectionContract } from "../../config";
import { GlobalContextType } from "./types";
import {
  getCollectionActivity,
  getCollectionMetadata,
  getCollectionNftsV2,
  getCollectionTraitsV2,
  getUserNfts,
} from "../../services/api/marketplace-reservoir-api";
import { CollectionMetadataV2 } from "../../types/reservoir-types/collection-metadata.types";
import { GetNftsReservoir } from "../../types/reservoir-types/collection-nfts.types";
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

const GlobalContext = createContext<GlobalContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const { user, chainId } = useConnectionContext()!;
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
  const [userBalance, setUserBalance] = useState({});
  const [userNfts, setUserNfts] = useState({} as UserNfts);
  const [minimalCards, setMinimalCards] = useState(true);

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
    if (user) {
      getUserNfts(chainId, user, collectionContract).then((result) => {
        setUserNfts(result);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getUserBalance(user!, chainId, API_KEY).then((result) => {
        setUserBalance(result);
      });
    }
  }, [user, chainId]);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
