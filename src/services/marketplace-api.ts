import { BASE_API } from "../config";
import { getQueryString } from "../utils";

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
  page: number,
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
