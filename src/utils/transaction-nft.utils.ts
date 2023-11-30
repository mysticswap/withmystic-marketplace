import { TransactionNft } from "../context/TransactionContext/types";
import { TokenElement } from "../types/reservoir-types/collection-nfts.types";
import { UserTokenElement } from "../types/reservoir-types/user-nfts.types";

export const getTransactionNft = (
  nft: TokenElement | UserTokenElement,
  isOffer: boolean,
  isSale: boolean,
  message: string,
  user: string,
  amount?: number,
  price?: number
) => {
  const tokenElementOwner = (nft as TokenElement)?.token?.owner;
  const tokenElementAmount = (nft as TokenElement)?.market?.floorAsk?.price
    ?.amount?.native;
  const tokenElementPrice = (nft as TokenElement)?.market?.floorAsk?.price
    ?.amount?.usd;

  const validFigure = (insertedValue: number, tokenValue: number) => {
    return insertedValue! >= 0 ? insertedValue : tokenValue;
  };

  let transactionNft: TransactionNft = {
    collectionName: nft?.token?.collection?.name,
    nftName: nft?.token?.name,
    nftImage: nft?.token?.image,
    amount: validFigure(amount!, tokenElementAmount),
    price: validFigure(price!, tokenElementPrice),
    isOffer,
    isSale,
    tokenId: nft?.token?.tokenId,
    nftOwner: tokenElementOwner || user,
    message,
  };

  return transactionNft;
};
