export type TransactionContextType = {
  showOfferOrListingModal: boolean;
  setShowOfferOrListingModal: React.Dispatch<React.SetStateAction<boolean>>;
  offerOrListModalContent: OfferOrListUiData;
  setOfferOrListModalContent: React.Dispatch<
    React.SetStateAction<OfferOrListUiData>
  >;
};

export type OfferOrListUiData = {
  collectionName: string;
  nftName: string;
  nftImage: string;
  amount: number;
  price: number;
  isOffer: boolean;
  tokenId: string;
};
