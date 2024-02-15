import { getHostName, truncateAddress } from ".";
import {
  DiscordPostBody,
  DiscordPostBodyToken,
} from "../types/discord-post.types";
import { ClientObject } from "../types/dynamic-system.types";
import { TokenElement } from "../types/rsv-types/collection-nfts.types";

export const getDiscordEndpointData = (
  nft: TokenElement,
  buyer: string,
  client: ClientObject,
  url: string,
  offeredEth?: string,
  offeredUsd?: string
) => {
  const data: DiscordPostBody = {
    hostname: getHostName(),
    seller: truncateAddress(nft?.token?.owner, 5, "..."),
    buyer: truncateAddress(buyer, 5, "..."),
    imageUrl: nft?.token?.image,
    priceEth:
      offeredEth || nft?.market?.floorAsk?.price?.amount?.native.toString(),
    priceUsd:
      offeredUsd || nft?.market?.floorAsk?.price?.amount?.usd.toString(),
    title: `${nft?.token?.name} SOLD!`,
    url: url,
    favicon: client.favicon,
  };
  return data;
};
export const getDiscordEndpointDataToken = (
  nft: TokenElement,
  buyer: string,
  client: ClientObject,
  url: string,
  offeredTokenAmount?: string,
  offeredUsd?: string
) => {
  const data: DiscordPostBodyToken = {
    hostname: getHostName(),
    seller: truncateAddress(nft?.token?.owner, 5, "..."),
    buyer: truncateAddress(buyer, 5, "..."),
    imageUrl: nft?.token?.image,
    tokenPrice:
      offeredTokenAmount ||
      nft?.market?.floorAsk?.price?.amount?.decimal.toString(),
    priceUsd:
      offeredUsd || nft?.market?.floorAsk?.price?.amount?.usd.toString(),
    title: `${nft?.token?.name} SOLD!`,
    url: url,
    favicon: client.favicon,
  };
  return data;
};
