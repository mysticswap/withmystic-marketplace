/* eslint-disable no-useless-catch */
import { BASE_API } from "../../config";
import {
  AuctionType,
  ListOrOfferType,
  SwapType,
  signedOrderToMongo,
} from "../../types/market-schemas.types";
import { filterObjectsByAttributes, getQueryString } from "../../utils";
import {
  ActivityApiToReservoirApi,
  ApiToReservoirApi,
  MetadataApiToReservoirApi,
  OffersApiToReservoirApi,
  SingleActivityApiToReservoirApi,
  SingleNFTApiToReservoirApi,
  SwapApiToReservoirApi,
  TraitApiToReservoirApi,
} from "../apiReconciliation";

const makeApiRequest = async (
  endpoint: string,
  queryParams: Record<string, string | number>
) => {
  const queryString = getQueryString(queryParams);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
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
  bodyParams: Record<string, unknown> // Allow varying types
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
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
  chainId: number
) => {
  const queryParams = { contractAddress, chainId };
  const owners = await getCollectionOwners(contractAddress, chainId);
  return MetadataApiToReservoirApi(
    await makeApiRequest("/marketplace-api/get-collection", queryParams),
    owners.totalOwners
  );
};

export const getCollectionNfts = async (
  contractAddress: string,
  chainId: number,
  page: number = 1,
  attributes?: string
) => {
  const queryParams = { contractAddress, chainId, page };
  const result = ApiToReservoirApi(
    await makeApiRequest("/marketplace-api/get-nfts-from-contract", queryParams)
  );

  const filteredResult = {
    tokens: filterObjectsByAttributes(result.tokens, attributes as string),
  };

  return filteredResult;
};

export const getSingleNft = async (
  contractAddress: string,
  tokenId: string,
  chainId: number
) => {
  const queryParams = { contractAddress, tokenId, chainId };
  const owner = (
    await makeApiRequest("/marketplace-api/get-nft-owners", queryParams)
  ).owners[0];
  const swaps = await getNeededSwaps(
    chainId,
    SwapType.Listing,
    contractAddress,
    1,
    100
  );

  const lastAsk = swaps.activities
    .filter((tk: any) => tk.token.tokenId == tokenId)
    .sort((a: any, b: any) => b.timestamp - a.timestamp)[0];

  return SingleNFTApiToReservoirApi(
    await makeApiRequest("/marketplace-api/get-nft", queryParams),
    owner,
    lastAsk
  );
};

export const getCollectionTraits = async (
  contractAddress: string,
  chainId: number
) => {
  const queryParams = { contractAddress, chainId };
  return TraitApiToReservoirApi(
    await makeApiRequest("/marketplace-api/get-collection-traits", queryParams)
  );
};

export const getNftOwner = async (
  contractAddress: string,
  tokenId: string,
  chainId: number
) => {
  const queryParams = { contractAddress, tokenId, chainId };
  return makeApiRequest("/marketplace-api/get-nft-owners", queryParams);
};

export const getCollectionOwners = async (
  contractAddress: string,
  chainId: number
) => {
  const queryParams = { contractAddress, chainId };
  return makeApiRequest("/marketplace-api/get-collection-owners", queryParams);
};

export const getCollectionHistory = async (
  contractAddress: string,
  chainId: number,
  types?: string,
  pageKey?: string
) => {
  const queryParams = {
    contractAddress,
    chainId,
    ...(pageKey && { pageKey }),
  };
  try {
    const activity = ActivityApiToReservoirApi(
      await makeApiRequest(
        "/marketplace-api/get-collection-history",
        queryParams
      ),
      types as string
    );

    return activity;
  } catch {
    return { activities: [] };
  }
};

export const getAllSwaps = async (
  chainId: number,
  token: string,
  page: number = 1,
  limit: number = 100,
  creatorAddress?: string
) => {
  const queryParams = {
    ...(creatorAddress && { creatorAddress }),
    chainId,
    page,
    limit,
  };
  let swaps = await makeApiRequest("/marketplace-api/all-swaps", queryParams);
  swaps = swaps.data.filter((i: signedOrderToMongo) =>
    [
      ...i.orderComponents.offer.map((j) => j.token),
      ...i.orderComponents.consideration.map((j) => j.token),
    ].includes(token)
  );
  return swaps;
};

export const getAllOffers = async (
  chainId: number,
  swapType: string,
  token: string,
  page: number = 1,
  limit: number = 100,
  status: string = "validated",
  creatorAddress?: string
) => {
  const queryParams = {
    ...(creatorAddress && { creatorAddress }),
    chainId,
    page,
    limit,
    status,
    type: swapType,
  };
  let swaps = await makeApiRequest(
    "/marketplace-api/filtered-swaps",
    queryParams
  );
  const mainToken = token.split(":")[0];
  const mainId = token.split(":")[1];
  swaps = swaps.data
    .filter((i: signedOrderToMongo) =>
      [
        ...i.orderComponents.offer.map((j) => j.token),
        ...i.orderComponents.consideration.map((j) => j.token),
      ].includes(mainToken)
    )
    .filter((i: signedOrderToMongo) =>
      [
        ...i.orderComponents.offer.map((j) => j.identifier),
        ...i.orderComponents.consideration.map((j) => j.identifier),
      ].includes(mainId)
    );

  return OffersApiToReservoirApi(swaps, chainId);
};

export const getNeededSwaps = async (
  chainId: number,
  swapType: string,
  token: string,
  page: number = 1,
  limit: number = 100,
  status: string = "validated",
  creatorAddress?: string
) => {
  const queryParams = {
    ...(creatorAddress && { creatorAddress }),
    chainId,
    page,
    limit,
    status,
    type: swapType,
  };
  let swaps = await makeApiRequest(
    "/marketplace-api/filtered-swaps",
    queryParams
  );

  swaps = swaps.data.filter((i: signedOrderToMongo) =>
    [
      ...i.orderComponents.offer.map((j) => j.token),
      ...i.orderComponents.consideration.map((j) => j.token),
    ].includes(token)
  );

  return SwapApiToReservoirApi(swaps);
};

export const getNftHistory = async (
  contractAddress: string,
  tokenId: string,
  chainId: number
) => {
  try {
    const queryParams = { contractAddress, chainId, tokenId };
    const res = SingleActivityApiToReservoirApi(
      await makeApiRequest("/marketplace-api/get-nft-history", queryParams)
    );
    return res;
  } catch {
    return { activities: [] };
  }
};

export const getUserBalance = async (address: string, chainId: number) => {
  const queryParams = { address, chainId };
  return makeApiRequest("/marketplace-api/get-balance", queryParams);
};

export const getUserNFTs = async (
  address: string,
  chainId: number,
  contractAddresses: string
) => {
  const queryParams = {
    address,
    chainId,
    contractAddresses: JSON.stringify([contractAddresses]),
  };
  return makeApiRequest("/marketplace-api/get-nfts", queryParams);
};

export const createSwap = async (swapData: ListOrOfferType) => {
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
  const response = await makeApiPostRequest(
    "/marketplace-api/create-swap",
    bodyParams
  );
  // if (response.statusCode == 200) {
  //   await validateSwap(response.swapId, "");
  // }
  return response;
};

export const validateSwap = async (swapId: string, signature: string) => {
  const bodyParams = {
    swapId,
    signature,
  };
  return makeApiPostRequest("/marketplace-api/validate-swap", bodyParams);
};

export const acceptSwap = async (swapId: string, takerAddress: string) => {
  const bodyParams = {
    swapId,
    takerAddress,
  };
  return makeApiPostRequest("/marketplace-api/accept-swap", bodyParams);
};

export const cancelSwap = async (swapId: string) => {
  const bodyParams = {
    swapId,
  };
  return makeApiPostRequest("/marketplace-api/cancel-swap", bodyParams);
};

export const verifyAcceptedSwap = async (swapId: string) => {
  const bodyParams = {
    swapId,
  };
  return makeApiPostRequest("/marketplace-api/verify-accepted", bodyParams);
};

export const verifyCancelledSwap = async (swapId: string) => {
  const bodyParams = {
    swapId,
  };
  return makeApiPostRequest("/marketplace-api/verify-cancelled", bodyParams);
};

export const validateAuction = async (auctionId: string, signature: string) => {
  const bodyParams = {
    auctionId,
    signature,
  };
  return makeApiPostRequest("/marketplace-api/validate-auction", bodyParams);
};

export const bidAuction = async (
  chainId: number,
  auctionId: string,
  token: string,
  amount: string,
  bidder: string
) => {
  const bodyParams = {
    chainId,
    auctionId,
    token,
    amount,
    bidder,
  };
  return makeApiPostRequest("/marketplace-api/bid-auction", bodyParams);
};

export const validateBid = async (
  chainId: number,
  auctionId: string,
  bidId: string
) => {
  console.log(chainId);
  const bodyParams = {
    auctionId,
    bidId,
  };
  return makeApiPostRequest("/marketplace-api/validate-bid", bodyParams);
};

export const getAllAuctions = async (chainId: number) => {
  const queryParams = { chainId };
  return makeApiRequest("/marketplace-api/get-auctions", queryParams);
};

export const getAllTokenAuctions = async (address: string, chainId: number) => {
  const queryParams = { contractAddress: address, chainId };
  return makeApiRequest("/marketplace-api/get-token-auctions", queryParams);
};

export const getOneAuction = async (auctionId: string) => {
  return makeApiRequest(`/marketplace-api/get-auction/${auctionId}`, {});
};

export const createAuction = async (swapData: AuctionType) => {
  const bodyParams = {
    chainId: swapData.chainId,
    offerer: swapData.offerer,
    offer: swapData.offer,
    endTime: swapData.endTime,
    startAmount: swapData.startAmount,
    ...(swapData.creatorAddress && { creatorAddress: swapData.creatorAddress }),
    ...(swapData.type && { type: swapData.type }),
    ...(swapData.fees && { fees: swapData.fees }),
    ...(swapData.startTime && { startTime: swapData.startTime }),
    ...(swapData.endAmount && { endAmount: swapData.endAmount }),
  };
  const response = await makeApiPostRequest(
    "/marketplace-api/create-auction",
    bodyParams
  );
  // if (response.statusCode == 200) {
  //   await validateSwap(response.swapId, "");
  // }
  return response;
};

// create auction
// get auctions
// validate auction
// bid for auction
// get an auction
