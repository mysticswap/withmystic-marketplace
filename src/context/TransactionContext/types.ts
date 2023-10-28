export type TransactionContextType = {
  showOfferOrListingModal: boolean;
  setShowOfferOrListingModal: React.Dispatch<React.SetStateAction<boolean>>;
  transactionNft: TransactionNft;
  setTransactionNft: React.Dispatch<React.SetStateAction<TransactionNft>>;
  showConfirmationModal: boolean;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  transactionStage: number;
  setTransactionStage: React.Dispatch<React.SetStateAction<number>>;
  transactionHash: string;
  setTransactionHash: React.Dispatch<React.SetStateAction<string>>;
  userCanCompleteTransaction: boolean;
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
};
