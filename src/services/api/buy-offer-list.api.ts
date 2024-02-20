import { toast } from "react-toastify";
import { marketplaceInstance } from "../axios";
import { otherChains } from "../../wallets/chains";
import { acceptSwap, createSwap } from "./marketplace-api";
import { SwapType } from "../../types/market-schemas.types";

export const createListing = async (
  chainId: number,
  maker: string,
  source: string,
  token: string,
  weiPrice: string,
  expirationTime: string,
  isListing: boolean = true,
  currency: string
) => {
  try {
    if (otherChains.includes(chainId)) {
      const tokenAddress = token.split(":")[0];
      const tokenId = token.split(":")[1];
      const swapData = {
        endTime: expirationTime,
        chainId,
        offerer: maker,
        offer: [
          {
            itemtype: "ERC721",
            token: tokenAddress,
            identifier: tokenId,
            amount: "1",
          },
        ],
        consideration: [
          {
            itemtype: "ERC721",
            token: tokenAddress,
            identifier: tokenId,
            amount: "1",
          },
        ],
        takerAddress: maker,
        type: SwapType.Listing,
      };
      const swapRes = await createSwap(swapData);
      return swapRes;
    }

    const request = await marketplaceInstance.post("/create-list-or-bid", {
      chainId,
      maker,
      source,
      token,
      weiPrice,
      expirationTime,
      isListing,
      currency,
    });
    return request.data;
  } catch (error) {
    toast.error("Something went wrong.");
  }
};

export const createBid = async (
  chainId: number,
  maker: string,
  source: string,
  token: string,
  weiPrice: string,
  expirationTime: string,
  isListing: boolean = false,
  currency?: string
) => {
  if (otherChains.includes(chainId)) {
    const tokenAddress = token.split(":")[0];
    const tokenId = token.split(":")[1];
    const swapData = {
      endTime: expirationTime,
      chainId,
      offerer: maker,
      offer: [
        {
          itemtype: "ERC721",
          token: tokenAddress,
          identifier: tokenId,
          amount: "1",
        },
      ],
      consideration: [
        {
          itemtype: "ERC721",
          token: tokenAddress,
          identifier: tokenId,
          amount: "1",
        },
      ],
      takerAddress: maker,
      type: SwapType.Offer,
    };
    const swapRes = await createSwap(swapData);
    return swapRes;
    //return await getCollectionHistory(contractAddress as string,chainId, (bearerToken || bearer) as string)
  }

  const request = await marketplaceInstance.post("/create-list-or-bid", {
    chainId,
    maker,
    source,
    token,
    weiPrice,
    expirationTime,
    isListing,
    currency,
  });
  return request.data;
};

export const buyListedNft = async (
  chainId: number,
  orderId: string,
  taker: string,
  source: string,
  isLocal?: boolean,
  onePercentFee?: number
) => {
  if (otherChains.includes(chainId)) {
    const swapRes = await acceptSwap(orderId, taker);
    return swapRes;
  }

  const request = await marketplaceInstance.post("/buy-nft", {
    chainId,
    orderId,
    taker,
    source,
    isLocal,
    onePercentFee,
  });
  return request.data;
};
export const buyListedNftInOtherToken = async (
  chainId: number,
  orderId: string,
  taker: string,
  source: string,
  isLocal: boolean,
  onePercentFee: number
) => {
  const request = await marketplaceInstance.post("/buy-nft", {
    chainId,
    orderId,
    taker,
    source,
    isLocal,
    onePercentFee,
  });
  return request.data;
};

export const acceptOffer = async (
  chainId: number,
  token: string,
  taker: string,
  source: string
) => {
  // if (otherChains.includes(chainId)) {
  //   const swapRes = await acceptSwap(orderId, taker);
  //   return swapRes;
  // }

  const request = await marketplaceInstance.post("/accept-offer", {
    chainId,
    token,
    taker,
    source,
  });
  return request.data;
};
