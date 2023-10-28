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
import { collectionContract } from "../../config";
import { useConnectionContext } from "../ConnectionContext/ConnectionContext";

const NftPageContext = createContext<NftPageContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const NftPageContextProvider = ({ children }: Props) => {
  const { id } = useParams();
  const { chainId } = useConnectionContext()!;
  const { collectionChainId, collectionMetadata } = useGlobalContext()!;

  const [nftDataV2, setNftDataV2] = useState({} as GetNftsReservoir);
  const [nftOffers, setNftOffers] = useState({} as NftOffers);
  const [nftActivity, setNftActivity] = useState({} as NftActivity);
  const [isLoading, setIsLoading] = useState(true);
  const nftInfo = nftDataV2?.tokens?.[0]?.token;
  const nftPriceData = nftDataV2?.tokens?.[0]?.market;

  const token = `${collectionContract}:${id}`;

  useEffect(() => {
    Promise.all([
      getSingleNftV2(collectionChainId! || chainId, token).then((result) => {
        setNftDataV2(result);
      }),
      getNftOffers(collectionChainId! || chainId, token).then((result) => {
        setNftOffers(result);
      }),
      getNftActivity(
        collectionChainId! || chainId,
        token,
        reservoirActivityTypes
      ).then((result) => setNftActivity(result)),
    ]).then(() => {
      setIsLoading(false);
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
      }}
    >
      {children}
    </NftPageContext.Provider>
  );
};

export const useNftPageContext = () => {
  return useContext(NftPageContext);
};
