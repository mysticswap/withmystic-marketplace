import { NumericFiltersType } from "../../context/HomeContext/types";
import { Post } from "../../types/rsv-types/listing-data.types";
import { Post as AuthPost } from "../../types/rsv-types/buy-data.types";
import { marketplaceInstance } from "../axios";
import { getCollection, getCollectionHistory, getCollectionNfts, getCollectionTraits, getNftHistory, getSingleNft, getUserNFTs } from "./marketplace-api";
import { otherChains } from "../../wallets/chains";

export const getCollectionMetadata = async (
  chainId: number,
  contractAddress: string,
  bearerToken?:string
) => {
  if(otherChains.includes(chainId)){
    return await getCollection(contractAddress as string,chainId,bearerToken as string)
  }

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
  numericFilters?: NumericFiltersType,
  source?: string,
  currencies?: string,
  bearerToken?: string
) => {

  if(otherChains.includes(chainId)){
    return await getCollectionNfts(contractAddress as string,chainId,1,bearerToken as string)
  }
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
      ...(source && { source }),
      ...(currencies && { currencies }),
    },
  });
  return request.data;
};

export const getCollectionActivity = async (
  chainId: number,
  contractAddress: string,
  types: string,
  bearerToken?: string
) => {
  if(otherChains.includes(chainId)){
    return await getCollectionHistory(contractAddress as string,chainId, bearerToken as string)
  }

  const request = await marketplaceInstance.get("/get-collection-activity", {
    params: { chainId, contractAddress, types },
  });
  return request.data;
};

export const getCollectionTraitsV2 = async (
  chainId: number,
  contractAddress: string,
  bearerToken?: string
) => {
  if(otherChains.includes(chainId)){
    return await getCollectionTraits(contractAddress as string,chainId, bearerToken as string)
  }

  const request = await marketplaceInstance("/get-traits", {
    params: { chainId, contractAddress },
  });
  return request.data;
};

export const getSingleNftV2 = async (chainId: number, tokens: string, bearerToken?: string) => {
  if(otherChains.includes(chainId)){
    const contractAddress = tokens.split(':')[0]
    const tokenId = tokens.split(':')[1]
    return await getSingleNft(contractAddress,tokenId,chainId, bearerToken as string)
  }

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
  if(otherChains.includes(chainId)){
    //return await getCollectionHistory(contractAddress as string,chainId, bearerToken as string)
  }

  const request = await marketplaceInstance("/get-nft-offers", {
    params: { chainId, token, ...(continuation && { continuation }) },
  });
  return request.data;
};

export const getNftActivity = async (
  chainId: number,
  token: string,
  types: string,
  continuation?: string,
  bearerToken?:string
) => {
  if(otherChains.includes(chainId)){
    const contractAddress = token.split(':')[0]
    const tokenId = token.split(':')[1]
    return await getNftHistory(contractAddress as string,tokenId,chainId, bearerToken as string)
  }

  const request = await marketplaceInstance("get-single-nft-activity", {
    params: { chainId, token, types, ...(continuation && { continuation }) },
  });
  return request.data;
};

export const getUserNfts = async (
  chainId: number,
  user: string,
  collection: string,
  continuation?: string,
  bearerToken?:string
) => {
  if(otherChains.includes(chainId)){
    return await getUserNFTs(user,chainId, collection as string, bearerToken as string)
  }

  const request = await marketplaceInstance("get-user-nfts", {
    params: {
      user,
      chainId,
      collection,
      ...(continuation && { continuation }),
    },
  });
  return request.data;
};

export const submitListOrBid = async (chainId: number, data: Post) => {
  if(otherChains.includes(chainId)){
    //return await getCollectionHistory(contractAddress as string,chainId, bearerToken as string)
  }

  const request = await marketplaceInstance.post("/submit-list-or-bid", {
    chainId,
    data,
  });
  const response = request.data;
  return response;
};

export const authSignature = async (
  chainId: number,
  signature: string,
  data: AuthPost
) => {
  const request = await marketplaceInstance.post("/auth-signature", {
    chainId,
    signature,
    data,
  });
  return request.data;
};
