import { NFTHistory } from "../../types/alchemy.types";
import { CollectionActivity as NftActivity } from "../../types/reservoir-types/collection-activity.types";
import {
  GetNftsReservoir,
  Market,
  OwnerNFT,
  SingleNftOS,
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
  isLoadingOS: boolean;
  setIsLoadingOS: React.Dispatch<React.SetStateAction<boolean>>;
  nftInfo: TokenToken;
  nftPriceData: Market;
  token: string;
  showShareModal: boolean;
  setShowShareModal: React.Dispatch<React.SetStateAction<boolean>>;

  // OS new

  nftDataOS: SingleNftOS;
  setNftDataOS: React.Dispatch<React.SetStateAction<SingleNftOS>>;
  ownerOfNFT: OwnerNFT;
  setOwnerOfNFT: React.Dispatch<React.SetStateAction<OwnerNFT>>;
  nftHistory: NFTHistory;
  setNftHistory: React.Dispatch<React.SetStateAction<NFTHistory>>;
};
