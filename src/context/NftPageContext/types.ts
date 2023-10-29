import { CollectionActivity as NftActivity } from "../../types/reservoir-types/collection-activity.types";
import {
  GetNftsReservoir,
  Market,
  TokenToken,
} from "../../types/reservoir-types/collection-nfts.types";
import { NftOffers } from "../../types/reservoir-types/nft-offers.types";

export type NftPageContextType = {
  nftDataV2: GetNftsReservoir;
  setNftDataV2: React.Dispatch<React.SetStateAction<GetNftsReservoir>>;
  nftOffers: NftOffers;
  setNftOffers: React.Dispatch<React.SetStateAction<NftOffers>>;
  nftActivity: NftActivity;
  setNftActivity: React.Dispatch<React.SetStateAction<NftActivity>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  nftInfo: TokenToken;
  nftPriceData: Market;
  token: string;
};
