import { marketplaceInstance } from "../axios";

export const createListing = async (
  chainId: number,
  maker: string,
  source: string,
  token: string,
  weiPrice: string,
  expirationTime: string,
  isListing: boolean = true
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
  source: string
) => {
  const request = await marketplaceInstance.post("/buy-nft", {
    chainId,
    orderId,
    taker,
    source,
  });
  return request.data;
};
