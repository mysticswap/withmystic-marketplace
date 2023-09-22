import { BASE_API } from "../config";
import { getQueryString } from "../utils";

export const getCollection = async (
  contractAddress: string,
  chainId: number,
  bearerToken: string
) => {
  const queryParams = { contractAddress, chainId };
  const queryString = getQueryString(queryParams);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  };
  const url = `${BASE_API}/marketplace-api/get-collection?${queryString}`;
  const request = await fetch(url, { method: "GET", headers });
  const response = await request.json();
  return response;
};

export const getCollectionNfts = async (
  contractAddress: string,
  chainId: number,
  page: number,
  bearerToken: string
) => {
  const queryParams = { contractAddress, chainId, page };
  const queryString = getQueryString(queryParams);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  };
  const url = `${BASE_API}/marketplace-api/get-nfts-from-contract?${queryString}`;
  const request = await fetch(url, { method: "GET", headers });
  const response = await request.json();
  return response;
};

export const getSingleNft = async (
  contractAddress: string,
  tokenId: string,
  chainId: number,
  bearerToken: string
) => {
  const queryParams = { contractAddress, tokenId, chainId };
  const queryString = getQueryString(queryParams);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  };
  const url = `${BASE_API}/marketplace-api/get-nft?${queryString}`;
  const request = await fetch(url, { headers });
  const response = await request.json();
  return response;
};

export const getCollectionTraits = async (
  contractAddress: string,
  chainId: number,
  bearerToken: string
) => {
  const queryParams = { contractAddress, chainId };
  const queryString = getQueryString(queryParams);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  };
  const url = `${BASE_API}/marketplace-api/get-collection-traits?${queryString}`;
  const request = await fetch(url, { headers });
  const response = await request.json();
  return response;
};

export const getNftOwner = async (
  contractAddress: string,
  tokenId: string,
  chainId: number,
  bearerToken: string
) => {
  const queryParams = { contractAddress, tokenId, chainId };
  const queryString = getQueryString(queryParams);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  };
  const url = `${BASE_API}/marketplace-api/get-nft-owners?${queryString}`;
  const request = await fetch(url, { headers });
  const response = await request.json();
  return response;
};
