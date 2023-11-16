import { getHostName } from ".";
import { ActivityObject, ActivityType } from "../types/activity.types";
import { TokenElement } from "../types/reservoir-types/collection-nfts.types";

export const generateActivity = (
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
    ...(buyer && { buyer }),
  };
  return activityObject;
};
