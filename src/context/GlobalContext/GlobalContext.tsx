/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserBalance } from "../../services/api/marketplace-api";
// import { API_KEY } from "../../config";
import { GlobalContextType } from "./types";
import {
  getCollectionActivity,
  getCollectionMetadata,
  getCollectionNftsV2,
  getCollectionTraitsV2,
  getUserNfts,
} from "../../services/api/marketplace-rsv-api";
import { CollectionMetadataV2 } from "../../types/rsv-types/collection-metadata.types";
import { GetNftsRsv } from "../../types/rsv-types/collection-nfts.types";
import {
  defaultSort,
  defaultSortby,
  offerTokens,
  rsvActivityTypes,
  tabOptions,
  wethAddresses,
} from "../../constants";
import { CollectionActivity } from "../../types/rsv-types/collection-activity.types";
import { CollectionTraitsV2 } from "../../types/rsv-types/collection-traits.types";
import { UserNfts } from "../../types/rsv-types/user-nfts.types";
import { useConnectionContext } from "../ConnectionContext/ConnectionContext";
import { getHostName, getPreviousCollectionAddress } from "../../utils";
import { coinList, getCryptoPrice } from "../../services/api/coin-gecko.api";
import { ClientObject, SupportedToken } from "../../types/dynamic-system.types";
import { useDisableNumberInputScroll } from "../../hooks/useDisableNumberInputScroll";
import { ETH_CONTRACT_ADDRESS } from "../../components/OfferOrListingModal/OfferOrListingModal";

const GlobalContext = createContext({} as GlobalContextType);

type Props = {
  children: ReactNode;
  client: ClientObject;
};

export const GlobalContextProvider = ({ children, client }: Props) => {
  const { user, chainId } = useConnectionContext()!;
  const availableCollections = client?.collections || [];

  const previousCollection = availableCollections.find((collection) => {
    return collection.address == getPreviousCollectionAddress();
  });

  const [selectedCollection, setSelectedCollection] = useState(
    previousCollection || availableCollections?.[0]
  );

  const collectionChainId = selectedCollection.chainId;
  const collectionContract = selectedCollection.address;

  const supportedTokens =
    getDistinctArray([
      ...(selectedCollection?.supportedTokens || []),
      ...(offerTokens[collectionChainId || 1] || []),
    ]) ||
    selectedCollection?.supportedTokens ||
    [];

  // console.log({ supportedTokens });

  // const [currentToken, setCurrentToken] = useState<number>(() =>
  //   supportedTokens!.findIndex((token) => token.symbol === "WETH")
  // );

  const [currentToken, setCurrentToken] = useState<number>(0);
  const [isAuction, setIsAuction] = useState<boolean>(false);

  const cryptoName = supportedTokens?.[currentToken]?.symbol
    ?.split(" ")
    ?.join("-")
    ?.toLowerCase();

  const [currentTab, setCurrentTab] = useState(tabOptions[0]);
  const [collectionMetadata, setCollectionMetadata] =
    useState<CollectionMetadataV2 | null>(null);
  const [collectionNfts, setCollectionNfts] = useState({} as GetNftsRsv);
  const [collectionActivity, setCollectionActivity] = useState(
    {} as CollectionActivity
  );
  const [collectionAttributes, setCollectionAttributes] = useState(
    {} as CollectionTraitsV2
  );
  const [selectedActivities, setSelectedActivities] = useState(["sale"]);
  const [userBalance, setUserBalance] = useState({});
  const [userNfts, setUserNfts] = useState({} as UserNfts);
  // Nft Views
  const [minimalCards, setMinimalCards] = useState(true);
  const [listView, setListView] = useState(false);

  const [cryptoValue, setCryptoValue] = useState(0);
  const [activitiesFetching, setActivitiesFetching] = useState(false);

  const selectedActivityTypes = JSON.stringify(selectedActivities);
  const source = getHostName();

  const [selectedToken, setSelectedToken] = useState(
    offerTokens[collectionChainId || 1]?.[0] || null
  );

  useEffect(() => {
    getCollectionMetadata(collectionChainId, collectionContract).then(
      (result) => {
        setCollectionMetadata(result);
      }
    );

    getCollectionNftsV2(
      collectionChainId,
      defaultSort,
      defaultSortby,
      collectionContract
    ).then((result) => {
      setCollectionNfts(result);
    });

    getCollectionActivity(
      collectionChainId,
      collectionContract,
      selectedActivityTypes
    ).then((result) => {
      setCollectionActivity(result);
    });

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
  ]);

  useEffect(() => {
    if (selectedActivities.length < 1) {
      setSelectedActivities(JSON.parse(rsvActivityTypes));
    }
    setCollectionActivity({} as CollectionActivity);
    setActivitiesFetching(true);
    getCollectionActivity(
      collectionChainId,
      collectionContract,
      selectedActivities.length < 1 ? rsvActivityTypes : selectedActivityTypes
    ).then((result) => {
      setCollectionActivity(result);
      setActivitiesFetching(false);
    });
  }, [
    collectionChainId,
    collectionContract,
    selectedActivities,
    selectedActivityTypes,
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
      getUserBalance(user!, collectionChainId).then((result) => {
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
    getCryptoPrice(cryptoName).then((result) => {
      if (Object.keys(result).length !== 0) {
        setCryptoValue(result[coinList[cryptoName]].usd);
      } else {
        setCryptoValue(0);
      }
    });
  }, [cryptoName]);

  function getDistinctArray(arr: SupportedToken[]) {
    const symbols: any = {};

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].contract == ETH_CONTRACT_ADDRESS) {
        arr[i].contract = wethAddresses[collectionChainId];
        arr[i].symbol = "WETH";
        arr[i].name = "Wrapped ETHEREUM";
      }

      if (!symbols[arr[i].contract]) {
        symbols[arr[i].contract] = arr[i];
      }
    }
    return Object.values(symbols) as SupportedToken[];
  }

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
        activitiesFetching,
        cryptoValue,
        client,
        supportedTokens,
        currentToken,
        setCurrentToken,
        selectedToken,
        setSelectedToken,
        isAuction,
        setIsAuction,
        listView,
        setListView,
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
