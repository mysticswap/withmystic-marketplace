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
  expirationTime: string
) => {
  const request = await marketplaceInstance.post("/create-listing", {
    chainId,
    maker,
    source,
    token,
    weiPrice,
    expirationTime,
  });
  return request.data;
};
