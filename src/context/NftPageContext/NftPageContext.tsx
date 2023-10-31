import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { NftPageContextType } from "./types";
import { NftOffers } from "../../types/reservoir-types/nft-offers.types";
import { GetNftsReservoir } from "../../types/reservoir-types/collection-nfts.types";
import { CollectionActivity as NftActivity } from "../../types/reservoir-types/collection-activity.types";
import {
  getNftActivity,
  getNftOffers,
  getSingleNftV2,
} from "../../services/api/marketplace-reservoir-api";
import { useGlobalContext } from "../GlobalContext/GlobalContext";
import { reservoirActivityTypes } from "../../constants";
import { useParams } from "react-router-dom";

const NftPageContext = createContext<NftPageContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const NftPageContextProvider = ({ children }: Props) => {
  const { id, contract } = useParams();
  const { collectionMetadata, setSelectedCollection, availableCollections } =
    useGlobalContext()!;

  const [nftDataV2, setNftDataV2] = useState({} as GetNftsReservoir);
  const [nftOffers, setNftOffers] = useState({} as NftOffers);
  const [nftActivity, setNftActivity] = useState({} as NftActivity);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const nftInfo = nftDataV2?.tokens?.[0]?.token;
  const nftPriceData = nftDataV2?.tokens?.[0]?.market;

  const requiredCollection = availableCollections.find((collection) => {
    return collection.address == contract;
  });

  const collectionChainId = requiredCollection?.chainId!;
  const token = `${requiredCollection?.address}:${id}`;

  useEffect(() => {
    Promise.all([
      getSingleNftV2(collectionChainId, token).then((result) => {
        setNftDataV2(result);
      }),
      getNftOffers(collectionChainId, token).then((result) => {
        setNftOffers(result);
      }),
      getNftActivity(collectionChainId, token, reservoirActivityTypes).then(
        (result) => setNftActivity(result)
      ),
    ]).then(() => {
      setIsLoading(false);
      setSelectedCollection(requiredCollection!);
    });
  }, [collectionMetadata]);

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
      }}
    >
      {children}
    </NftPageContext.Provider>
  );
};

export const useNftPageContext = () => {
  return useContext(NftPageContext);
};
