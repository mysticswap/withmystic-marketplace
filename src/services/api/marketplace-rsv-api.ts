import { NumericFiltersType } from "../../context/HomeContext/types";
import { Post } from "../../types/rsv-types/listing-data.types";
import { Post as AuthPost } from "../../types/rsv-types/buy-data.types";
import { marketplaceInstance } from "../axios";
import {
  getAllOffers,
  // getAllSwaps,
  getCollection,
  getCollectionHistory,
  getCollectionNfts,
  getCollectionTraits,
  getNftHistory,
  getSingleNft,
  getUserNFTs,
} from "./marketplace-api";
import { otherChains } from "../../wallets/chains";
import { SwapType } from "../../types/market-schemas.types";
import { UserNFTToReservoirAPI } from "../apiReconciliation";
import { Activity } from "../../types/rsv-types/collection-activity.types";

export const getCollectionMetadata = async (
  chainId: number,
  contractAddress: string
) => {
  if (otherChains.includes(chainId)) {
    return await getCollection(contractAddress as string, chainId);
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
  currencies?: string
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
      ...(source && { source }),
      ...(currencies && { currencies }),
    },
  });

  if (otherChains.includes(chainId)) {
    const data = await getCollectionNfts(
      contractAddress as string,
      chainId,
      1,
      attributes
    );
    return data;
  }
  // const request = await marketplaceInstance.get("get-nfts-v2", {
  //   params: {
  //     chainId,
  //     sortBy,
  //     sortDirection,
  //     contractAddress,
  //     ...(continuation && { continuation }),
  //     ...(attributes && { attributes }),
  //     ...(tokens && { tokens }),
  //     ...(numericFilters && { numericFilters }),
  //     ...(source && { source }),
  //     ...(currencies && { currencies }),
  //   },
  // });

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

  if (otherChains.includes(chainId)) {
    // const swaps = await getAllSwaps(chainId, contractAddress);

    const history = await getCollectionHistory(
      contractAddress as string,
      chainId,
      types
    );
    return {
      activities: [
        // ...swaps.activities,
        ...history.activities,
        ...request.data.activities,
      ].sort((a, b) => b.timestamp - a.timestamp) as Activity[],
      continuation: "",
    };
  } else {
    return request.data;
  }
};

export const getCollectionTraitsV2 = async (
  chainId: number,
  contractAddress: string
) => {
  if (otherChains.includes(chainId)) {
    return await getCollectionTraits(contractAddress as string, chainId);
  }

  const request = await marketplaceInstance("/get-traits", {
    params: { chainId, contractAddress },
  });
  return request.data;
};

export const getSingleNftV2 = async (chainId: number, tokens: string) => {
  if (otherChains.includes(chainId)) {
    const contractAddress = tokens.split(":")[0];
    const tokenId = tokens.split(":")[1];
    return await getSingleNft(contractAddress, tokenId, chainId);
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
  const offers = [];
  const offer = await getAllOffers(chainId, SwapType.Offer, token);
  offers.push(...offer.orders);

  const request = await marketplaceInstance("/get-nft-offers", {
    params: { chainId, token, ...(continuation && { continuation }) },
  });
  offers.push(...request.data.orders);
  return { orders: offers, continuation: request.data.continuation };
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

  if (otherChains.includes(chainId)) {
    const contractAddress = token.split(":")[0];
    const tokenId = token.split(":")[1];
    const allActivities = [
      ...(await getNftHistory(contractAddress as string, tokenId, chainId))
        .activities,
      ...request.data.activities,
    ];

    return { activities: allActivities };
  }
  return request.data;
};

function mergeUnique(
  arr1: any[],
  arr2: any[],
  identifier: string,
  identifier2: string
) {
  const mergedArray = arr1.concat(arr2);
  const uniqueArray = mergedArray.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.token[identifier] === item.token[identifier] &&
          t.token[identifier2] === item.token[identifier2]
      )
  );
  return uniqueArray;
}

export const getUserNfts = async (
  chainId: number,
  user: string,
  collection: string,
  continuation?: string
) => {
  const nfts = [];
  const nft = UserNFTToReservoirAPI(
    await getUserNFTs(user, chainId, collection as string),
    chainId
  );
  nfts.push(...nft.tokens);

  const request = await marketplaceInstance("get-user-nfts", {
    params: {
      user,
      chainId,
      collection,
      ...(continuation && { continuation }),
    },
  });

  const tokens = mergeUnique(request.data.tokens, nfts, "contract", "tokenId");

  return { tokens, continuation: null };
};

export const submitListOrBid = async (chainId: number, data: Post) => {
  if (otherChains.includes(chainId)) {
    //return await getCollectionHistory(contractAddress as string,chainId,)
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
