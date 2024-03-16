export type TransactionContextType = {
  showOfferOrListingModal: boolean;
  setShowOfferOrListingModal: React.Dispatch<React.SetStateAction<boolean>>;
  transactionNft: TransactionNft;
  setTransactionNft: React.Dispatch<React.SetStateAction<TransactionNft>>;
  showConfirmationModal: boolean;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmationBuyNowModal: boolean;
  setShowConfirmationBuyNowModal: React.Dispatch<React.SetStateAction<boolean>>;
  transactionStage: number;
  setTransactionStage: React.Dispatch<React.SetStateAction<number>>;
  transactionHash: string;
  setTransactionHash: React.Dispatch<React.SetStateAction<string>>;
  userCanCompleteTransaction: boolean;
  showAuctionModal: boolean;
  setShowAuctionModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TransactionNft = {
  collectionName: string;
  nftName: string;
  nftImage: string;
  amount: number;
  price: number;
  isOffer: boolean;
  isSale: boolean;
  tokenId: string;
  message: string;
  nftOwner: string;
  symbol: string;
  isBuyNow: boolean;
  nftType: string;
};
