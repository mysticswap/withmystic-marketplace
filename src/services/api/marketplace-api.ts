/* eslint-disable no-useless-catch */
import { BASE_API } from "../../config";
import { ListOrOfferType } from "../../types/market-schemas.types";
import { getQueryString } from "../../utils";

const makeApiRequest = async (
  endpoint: string,
  queryParams: Record<string, string | number>,
  bearerToken: string
) => {
  const queryString = getQueryString(queryParams);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  };
  const url = `${BASE_API}${endpoint}?${queryString}`;

  try {
    const response = await fetch(url, { method: "GET", headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    // Handle the error appropriately (e.g., log it, throw a custom error, etc.)
    throw error;
  }
};

const makeApiPostRequest = async (
  endpoint: string,
  bodyParams: Record<string, any>, // Allow varying types
  bearerToken: string
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  };
  const url = `${BASE_API}${endpoint}`;

  try {
    let requestBody;
    if (typeof bodyParams === "object") {
      requestBody = JSON.stringify(bodyParams);
    } else {
      requestBody = bodyParams;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: requestBody,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    // Handle the error appropriately (e.g., log it, throw a custom error, etc.)
    throw error;
  }
};

export const getCollection = async (
  contractAddress: string,
  chainId: number,
  bearerToken: string
) => {
  const queryParams = { contractAddress, chainId };
  return makeApiRequest(
    "/marketplace-api/get-collection",
    queryParams,
    bearerToken
  );
};

export const getCollectionNfts = async (
  contractAddress: string,
  chainId: number,
  page: string,
  bearerToken: string
) => {
  const queryParams = { contractAddress, chainId, page };
  return makeApiRequest(
    "/marketplace-api/get-nfts-from-contract",
    queryParams,
    bearerToken
  );
};

export const getSingleNft = async (
  contractAddress: string,
  tokenId: string,
  chainId: number,
  bearerToken: string
) => {
  const queryParams = { contractAddress, tokenId, chainId };
  return makeApiRequest("/marketplace-api/get-nft", queryParams, bearerToken);
};

export const getCollectionTraits = async (
  contractAddress: string,
  chainId: number,
  bearerToken: string
) => {
  const queryParams = { contractAddress, chainId };
  return makeApiRequest(
    "/marketplace-api/get-collection-traits",
    queryParams,
    bearerToken
  );
};

export const getNftOwner = async (
  contractAddress: string,
  tokenId: string,
  chainId: number,
  bearerToken: string
) => {
  const queryParams = { contractAddress, tokenId, chainId };
  return makeApiRequest(
    "/marketplace-api/get-nft-owners",
    queryParams,
    bearerToken
  );
};

export const getCollectionOwners = async (
  contractAddress: string,
  chainId: number,
  bearerToken: string
) => {
  const queryParams = { contractAddress, chainId };
  return makeApiRequest(
    "/marketplace-api/get-collection-owners",
    queryParams,
    bearerToken
  );
};

export const getCollectionHistory = async (
  contractAddress: string,
  chainId: number,
  bearerToken: string,
  pageKey?: string
) => {
  const queryParams = {
    contractAddress,
    chainId,
    ...(pageKey && { pageKey }),
  };
  return makeApiRequest(
    "/marketplace-api/get-collection-history",
    queryParams,
    bearerToken
  );
};

export const getNftHistory = async (
  contractAddress: string,
  tokenId: string,
  chainId: number,
  bearerToken: string
) => {
  const queryParams = { contractAddress, chainId, tokenId };
  return makeApiRequest(
    "/marketplace-api/get-nft-history",
    queryParams,
    bearerToken
  );
};

export const getUserBalance = async (
  address: string,
  chainId: number,
  bearerToken: string
) => {
  const queryParams = { address, chainId };
  return makeApiRequest(
    "/marketplace-api/get-balance",
    queryParams,
    bearerToken
  );
};

export const createSwap = async (
  swapData: ListOrOfferType,
  bearerToken: string
) => {
  const bodyParams = {
    chainId: swapData.chainId,
    offerer: swapData.offerer,
    consideration: swapData.consideration,
    offer: swapData.offer,
    ...(swapData.takerAddress && { takerAddress: swapData.takerAddress }),
    ...(swapData.type && { type: swapData.type }),
    ...(swapData.domain && { domain: swapData.domain }),
    ...(swapData.fees && { fees: swapData.fees }),
    ...(swapData.endTime && { endTime: swapData.endTime }),
  };
  return makeApiPostRequest(
    "/marketplace-api/create-swap",
    bodyParams,
    bearerToken
  );
};

export const validateSwap = async (
  swapId: string,
  signature: string,
  bearerToken: string
) => {
  const bodyParams = {
    swapId,
    signature,
  };
  return makeApiPostRequest(
    "/marketplace-api/validate-swap",
    bodyParams,
    bearerToken
  );
};

export const acceptSwap = async (
  swapId: string,
  signature: string,
  bearerToken: string
) => {
  const bodyParams = {
    swapId,
    signature,
  };
  return makeApiPostRequest(
    "/marketplace-api/validate-swap",
    bodyParams,
    bearerToken
  );
};

// create swap
// validate swap
// accept swap
// verify swap acceptance
// cancel swap,
// verify swap cancellation
// get all swaps
// get swaps
// get nft other blockchains
// get metadata
// get nfts
