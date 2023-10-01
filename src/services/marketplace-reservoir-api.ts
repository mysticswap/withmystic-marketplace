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
