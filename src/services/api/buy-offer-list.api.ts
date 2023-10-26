import {
  ListOrOfferType,
  PayloadVerify,
} from "../../types/market-schemas.types";
import { marketplaceInstance } from "../axios";

export const listOrOffer = async (postBody: ListOrOfferType) => {
  const request = await marketplaceInstance.post("/create-swap", postBody);
  return request.data;
};

export const validateOfferOrList = async (postBody: PayloadVerify) => {
  const request = await marketplaceInstance.post("/validate-swap", postBody);
  return request.data;
};

export const createListing = async (
  chainId: number,
  maker: string,
  source: string,
  token: string,
  weiPrice: string,
  expirationTime: string,
  isListing: boolean = true
) => {
  const request = await marketplaceInstance.post("/create-listing", {
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
  const request = await marketplaceInstance.post("/create-listing", {
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
