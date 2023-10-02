import { marketplaceInstance } from "./axios";

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
  contractAddress: string,
  continuation?: string,
  attributes?: string
) => {
  const request = await marketplaceInstance.get("get-nfts-v2", {
    params: {
      chainId,
      contractAddress,
      ...(continuation && { continuation }),
      ...(attributes && { attributes }),
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
