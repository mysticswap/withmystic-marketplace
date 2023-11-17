import { TransactionNft } from "../context/TransactionContext/types";
import { TokenElement } from "../types/reservoir-types/collection-nfts.types";
import { UserTokenElement } from "../types/reservoir-types/user-nfts.types";

export const getTransactionNft = (
  nft: TokenElement | UserTokenElement,
  isOffer: boolean,
  isSale: boolean,
  message: string,
  amount?: number,
  price?: number
) => {
  let transactionNft: TransactionNft = {
    collectionName: nft?.token?.collection?.name,
    nftName: nft?.token?.name,
    nftImage: nft?.token?.image,
    amount: 0,
    price: 0,
    isOffer,
    isSale,
    tokenId: nft?.token?.tokenId,
    message,
    nftOwner: "",
  };

  if (isUserToken(nft)) {
    transactionNft = {
      ...transactionNft,
      amount: amount!,
      price: price!,
      nftOwner: (nft as UserTokenElement).ownership?.floorAsk?.maker,
    };
  } else {
    transactionNft = {
      ...transactionNft,
      amount:
        amount ||
        (nft as TokenElement)?.market?.floorAsk?.price?.amount?.native,
      price:
        price || (nft as TokenElement)?.market?.floorAsk?.price?.amount?.native,
      nftOwner: (nft as TokenElement).token.owner,
    };
  }
  return transactionNft;
};

const isUserToken = (nft: TokenElement | UserTokenElement) => {
  return nft.hasOwnProperty("market");
};
