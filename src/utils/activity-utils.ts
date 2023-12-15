import { getHostName } from ".";
import { TransactionNft } from "../context/TransactionContext/types";
import { ActivityObject, ActivityType } from "../types/activity.types";
import { CollectionMetadataV2 } from "../types/rsv-types/collection-metadata.types";
import { TokenElement } from "../types/rsv-types/collection-nfts.types";

export const generateSaleActivity = (
  nft: TokenElement,
  type: ActivityType,
  buyer?: string,
  price?: string
) => {
  const activityObject: ActivityObject = {
    tokenName: nft?.token?.name,
    tokenId: nft?.token?.tokenId,
    contractAddress: nft?.token?.contract,
    seller: nft?.token.owner,
    domain: getHostName(),
    price: price || nft?.market?.floorAsk?.price?.amount?.native.toString(),
    type,
    image: nft?.token?.image,
    ...(buyer && { buyer }),
  };
  return activityObject;
};

export const generateListOrBidActivity = (
  nft: TransactionNft,
  collectionMetadata: CollectionMetadataV2,
  user: string
) => {
  const data: ActivityObject = {
    tokenName: nft.nftName,
    contractAddress: collectionMetadata?.collections[0].primaryContract!,
    tokenId: nft.tokenId,
    price: nft?.amount?.toString(),
    domain: getHostName(),
    seller: nft.nftOwner,
    type: nft.isOffer ? "offer" : "listing",
    image: nft?.nftImage,
    ...(nft.isOffer && { buyer: user }),
  };

  return data;
};
