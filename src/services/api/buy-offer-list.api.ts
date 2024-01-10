import { toast } from "react-toastify";
import { marketplaceInstance } from "../axios";

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
  isListing: boolean = false
) => {
  const request = await marketplaceInstance.post("/create-list-or-bid", {
    chainId,
    maker,
    source,
    token,
    weiPrice,
    expirationTime,
    isListing,
  });
  return request.data;
};

export const buyListedNft = async (
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
  const request = await marketplaceInstance.post("/accept-offer", {
    chainId,
    token,
    taker,
    source,
  });
  return request.data;
};
