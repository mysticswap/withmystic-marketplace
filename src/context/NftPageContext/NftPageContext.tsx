/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { NftPageContextType } from "./types";
import { NftOffers } from "../../types/reservoir-types/nft-offers.types";
import {
  GetNftsReservoir,
  INFT,
  OwnerNFT,
  SingleNftOS,
} from "../../types/reservoir-types/collection-nfts.types";
import { CollectionActivity as NftActivity } from "../../types/reservoir-types/collection-activity.types";
import {
  getNftActivity,
  getNftOffers,
  getSingleNftV2,
} from "../../services/api/marketplace-reservoir-api";
import { useGlobalContext } from "../GlobalContext/GlobalContext";
import { reservoirActivityTypes } from "../../constants";
import { useParams } from "react-router-dom";
import {
  getNftHistory,
  getNftOwner,
  getSingleNft,
} from "../../services/api/marketplace-api";
import { NFTHistory } from "../../types/alchemy.types";

const NftPageContext = createContext<NftPageContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const NftPageContextProvider = ({ children }: Props) => {
  const { id, contract } = useParams();
  const {
    collectionMetadata,
    setSelectedCollection,
    availableCollections,
    client,
    collectionMetadataOS,
    collectionChainId,
  } = useGlobalContext();

  const [nftDataV2, setNftDataV2] = useState({} as GetNftsReservoir);
  const [nftDataOS, setNftDataOS] = useState({} as SingleNftOS);

  const [ownerOfNFT, setOwnerOfNFT] = useState({} as OwnerNFT);
  const [nftHistory, setNftHistory] = useState({} as NFTHistory);

  const [nftOffers, setNftOffers] = useState({} as NftOffers);
  const [nftActivity, setNftActivity] = useState({} as NftActivity);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOS, setIsLoadingOS] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const nftInfo = nftDataV2?.tokens?.[0]?.token;
  const nftPriceData = nftDataV2?.tokens?.[0]?.market;

  const requiredCollection = availableCollections.find((collection) => {
    return collection.address == contract;
  });

  // const collectionChainId = requiredCollection?.chainId!;
  // console.log(collectionChainId);
  const token = `${requiredCollection?.address}:${id}`;
  // const token = `${collectionChainId}:${id}`;

  useEffect(() => {
    const fetchSingleNFTOS = async () => {
      try {
        const res: SingleNftOS = await getSingleNft(
          requiredCollection?.address!,
          id!,
          collectionChainId,
          client.apiKey
        );
        setNftDataOS(res);
        // setIsLoading(false);
        console.log({ single: res });
      } catch (error) {
        console.log("Error");
        console.log(error);
      } finally {
        setIsLoadingOS(false);
      }
    };

    const fetchNftOwnerOS = async () => {
      const res = await getNftOwner(
        requiredCollection?.address!,
        id!,
        collectionChainId,
        client.apiKey
      );
      console.log({ owner: res });
      setOwnerOfNFT(res);
    };

    const fetchNFTHistory = async () => {
      const res: NFTHistory = await getNftHistory(
        requiredCollection?.address!,
        id!,
        collectionChainId,
        client.apiKey
      );
      console.log({ history: res });
      setNftHistory(res);
    };

    // const fetchData = async () => {
    //   try {
    //     await Promise.all([
    //       fetchSingleNFTOS(),
    //       fetchNFTHistory(),
    //       fetchNftOwnerOS(),
    //     ]);

    //     // Handle the data from all three requests

    //     // Further processing or state updates with the received data
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchData();

    // fetchNftOwnerOS();
    // fetchNFTHistory();
    // fetchSingleNFTOS();

    // Promise.all([
    //   getSingleNftV2(collectionChainId, token).then((result) => {
    //     setNftDataV2(result);
    //   }),
    //   getNftOffers(collectionChainId, token).then((result) => {
    //     setNftOffers(result);
    //   }),
    //   getNftActivity(collectionChainId, token, reservoirActivityTypes).then(
    //     (result) => setNftActivity(result)
    //   ),
    // ]).then(() => {
    //   setIsLoading(false);
    //   setSelectedCollection(requiredCollection!);
    // });

    const fetchData = async () => {
      try {
        const [nftDataV2Result, nftOffersResult, nftActivityResult] =
          await Promise.all([
            getSingleNftV2(collectionChainId, token),
            getNftOffers(collectionChainId, token),
            getNftActivity(collectionChainId, token, reservoirActivityTypes),
          ]);

        setNftDataV2(nftDataV2Result);
        setNftOffers(nftOffersResult);
        setNftActivity(nftActivityResult);

        setIsLoading(false);
        setSelectedCollection(requiredCollection!);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };

    const fetchData2 = async () => {
      try {
        const [nftDataResult, nftOwnerResult, nftHistoryResult] =
          await Promise.all([
            getSingleNft(
              requiredCollection?.address!,
              id!,
              collectionChainId,
              client.apiKey
            ),
            getNftOwner(
              requiredCollection?.address!,
              id!,
              collectionChainId,
              client.apiKey
            ),
            getNftHistory(
              requiredCollection?.address!,
              id!,
              collectionChainId,
              client.apiKey
            ),
          ]);

        setNftDataOS(nftDataResult);
        setOwnerOfNFT(nftOwnerResult);
        setNftHistory(nftHistoryResult);

        setIsLoading(false);
        setSelectedCollection(requiredCollection!);
      } catch (error) {
        // Handle errors here
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    if (collectionChainId === 1) {
      fetchData2();
    } else {
      fetchData();
    }

    // fetchData2(); // Call the async function
  }, [
    collectionMetadata,
    collectionChainId,
    requiredCollection,
    setSelectedCollection,
    token,
    client.apiKey,
    id,
  ]);

  return (
    <NftPageContext.Provider
      value={{
        nftDataV2,
        setNftDataV2,
        nftOffers,
        setNftOffers,
        nftActivity,
        setNftActivity,
        isLoading,
        setIsLoading,
        nftInfo,
        nftPriceData,
        token,
        showShareModal,
        setShowShareModal,
        nftDataOS,
        setNftDataOS,
        ownerOfNFT,
        nftHistory,
        isLoadingOS,
        setIsLoadingOS,
        setNftHistory,
        setOwnerOfNFT,
      }}
    >
      {children}
    </NftPageContext.Provider>
  );
};

export const useNftPageContext = () => {
  const context = useContext(NftPageContext);

  if (context === undefined)
    throw new Error("NftPageContext was used outside the NftPageProvider");
  return context;
};
