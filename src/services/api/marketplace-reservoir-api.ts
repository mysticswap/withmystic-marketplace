import { NumericFiltersType } from "../../context/HomeContext/types";
import { marketplaceInstance } from "../axios";

export const getCollectionMetadata = async (
  chainId: number,
  contractAddress: string
) => {
  const request = await marketplaceInstance.get("/get-collection-metadata", {
    params: { chainId, contractAddress },
  });
  return request.data;
};

export const getCollectionNftsV2 = async (
  chainId: number,
  sortBy: string,
  sortDirection: string,
  contractAddress?: string,
  continuation?: string,
  attributes?: string,
  tokens?: string,
  numericFilters?: NumericFiltersType
) => {
  const request = await marketplaceInstance.get("get-nfts-v2", {
    params: {
      chainId,
      sortBy,
      sortDirection,
      contractAddress,
      ...(continuation && { continuation }),
      ...(attributes && { attributes }),
      ...(tokens && { tokens }),
      ...(numericFilters && { numericFilters }),
    },
  });
  return request.data;
};

export const getCollectionActivity = async (
  chainId: number,
  contractAddress: string,
  types: string
) => {
  const request = await marketplaceInstance.get("/get-collection-activity", {
    params: { chainId, contractAddress, types },
  });
  return request.data;
};

export const getCollectionTraitsV2 = async (
  chainId: number,
  contractAddress: string
) => {
  const request = await marketplaceInstance("/get-traits", {
    params: { chainId, contractAddress },
  });
  return request.data;
};

export const getSingleNftV2 = async (chainId: number, tokens: string) => {
  const request = await marketplaceInstance("/get-nft-v2", {
    params: { chainId, tokens },
  });
  return request.data;
};

export const getNftOffers = async (
  chainId: number,
  token: string,
  continuation?: string
) => {
  const request = await marketplaceInstance("/get-nft-offers", {
    params: { chainId, token, ...(continuation && { continuation }) },
  });
  return request.data;
};

export const getNftActivity = async (
  chainId: number,
  token: string,
  types: string,
  continuation?: string
) => {
  const request = await marketplaceInstance("get-single-nft-activity", {
    params: { chainId, token, types, ...(continuation && { continuation }) },
  });
  return request.data;
};
