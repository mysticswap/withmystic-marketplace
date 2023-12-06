import { CollectionActivity as NftActivity } from "../../types/rsv-types/collection-activity.types";
import {
  GetNftsRsv,
  Market,
  TokenToken,
} from "../../types/rsv-types/collection-nfts.types";
import { NftOffers } from "../../types/rsv-types/nft-offers.types";

export type NftPageContextType = {
  nftDataV2: GetNftsRsv;
  setNftDataV2: React.Dispatch<React.SetStateAction<GetNftsRsv>>;
  nftOffers: NftOffers;
  setNftOffers: React.Dispatch<React.SetStateAction<NftOffers>>;
  nftActivity: NftActivity;
  setNftActivity: React.Dispatch<React.SetStateAction<NftActivity>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  nftInfo: TokenToken;
  nftPriceData: Market;
  token: string;
  showShareModal: boolean;
  setShowShareModal: React.Dispatch<React.SetStateAction<boolean>>;
};
