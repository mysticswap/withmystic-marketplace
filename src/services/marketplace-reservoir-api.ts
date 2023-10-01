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
  continuation?: string
) => {
  const request = await marketplaceInstance.get("get-nfts-v2", {
    params: {
      chainId,
      contractAddress,
      ...(continuation && { continuation }),
    },
  });
  return request.data;
};
