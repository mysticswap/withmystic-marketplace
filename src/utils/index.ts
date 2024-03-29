/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectedTrait } from "../context/HomeContext/types";
import { Market, TokenToken } from "../types/rsv-types/collection-nfts.types";

export const getQueryString = (params: { [x: string]: any }) => {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
};

export const truncateAddress = (
  address: string,
  amount: number,
  ellipsis: string
) => {
  return `${address?.slice(0, amount)}${ellipsis}${address?.slice(-amount)}`;
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const convertDecimalsToReadableNumbers = (
  amount: string,
  decimal: number
) => {
  const result = Number(amount) / Math.pow(10, decimal);
  return result || 0;
};

export const convertTokenAmountToDecimal = (amount: number) => {
  return amount * Math.pow(10, 18);
  // might need to change 18 to dynamic figure
};
export const convertTokenAmountToDecimals = (
  amount: number,
  decimal: number
) => {
  return amount * Math.pow(10, decimal);
  // might need to change 18 to dynamic figure
};

export const metamaskPresent = () => {
  const ethereum = window.ethereum;
  return typeof ethereum !== "undefined" && window.ethereum.isMetaMask;
};

export const extractMetadata = (nft: TokenToken, nftMarketInfo: Market) => {
  return {
    collectionName: nft?.collection?.name,
    nftName: nft?.name,
    nftImage: nft?.image,
    amount: nftMarketInfo?.floorAsk?.price?.amount?.decimal,
    price: nftMarketInfo?.floorAsk?.price?.amount?.usd,
    floorPrice: nftMarketInfo?.floorAsk?.price?.amount?.decimal,
  };
};

export const formatOnlyDecimals = (x: number) => {
  return (x * 1.5).toFixed(2).replace(/[.,]00$/, "");
};

export const redirectToMSWalletPage = (address: string) => {
  if (window.location.hostname == "localhost") {
    address && window.open(`http://${window.location.host}/wallet/${address}`);
  } else {
    address && window.open(`https://${window.location.host}/wallet/${address}`);
  }
};

export const redirectToNftPage = (
  contract: string,
  tokenId: string,
  isLocal: boolean,
  chainId?: number
) => {
  const baseTokenNames: { [key: string]: string } = {
    1: "ethereum",
    137: "matic",
    169: "ethereum",
  };
  if (isLocal) {
    if (window.location.hostname == "localhost") {
      contract &&
        window.open(`http://${window.location.host}/${contract}/${tokenId}`);
    } else {
      contract &&
        window.open(`https://${window.location.host}/${contract}/${tokenId}`);
    }
  } else {
    window.open(
      `https://opensea.io/assets/${
        baseTokenNames[chainId!]
      }/${contract}/${tokenId}`
    );
  }
};

export const generateCollectionQueryString = (localCollections: string[]) => {
  let query = "";
  localCollections.forEach((item, index) => {
    if (index == 0) {
      query += `?collection=${item}`;
    } else {
      query += `&collection=${item}`;
    }
  });
  return query;
};
export const generateAttributeString = (selectedTraits: SelectedTrait[]) => {
  let string = "&includeAttributes=true";
  selectedTraits.forEach((item) => {
    if (item.value) {
      string += `&attributes[${item.type}]=${item.value}`;
    } else {
      string += `&attributeKey=${item.type}`;
    }
  });
  return string;
};

export const getHostName = () => {
  const hostName = window.location.hostname;
  switch (hostName) {
    case "localhost":
      return "marketplace.mysticswaplocalhost.io";
      // BlackVI_NFT host
      return "deploy-preview-25--heroic-duckanoo-b32f52.netlify.app";
      //DiamondNXT-NFT host
      return "deploy-preview-48--heroic-duckanoo-b32f52.netlify.app";
      return "talentprotocol.withmystic.xyz";
      return "deploy-preview-14--heroic-duckanoo-b32f52.netlify.app";
      // SteadyStack host
      return "deploy-preview-15--heroic-duckanoo-b32f52.netlify.app";
    case "deploy-preview-109--heroic-duckanoo-b32f52.netlify.app":
      return "marketplace.mysticswaplocalhost.io";
      //DiamondNXT-NFT host
      return "deploy-preview-48--heroic-duckanoo-b32f52.netlify.app";
      return "talentprotocol.withmystic.xyz";
    case "deploy-preview-81--heroic-duckanoo-b32f52.netlify.app":
      return "deploy-preview-48--heroic-duckanoo-b32f52.netlify.app";
      return "deploy-preview-19--heroic-duckanoo-b32f52.netlify.app";
      return "marketplace.mysticswaplocalhost.io";
      return "market.localhost.io";
    case "deploy-preview-84--heroic-duckanoo-b32f52.netlify.app":
      return "deploy-preview-48--heroic-duckanoo-b32f52.netlify.app";
      return "marketplace.mysticswaplocalhost.io";
    // return "marketplace.mysticswaplocalhost.io";
    // return "deploy-preview-26--heroic-duckanoo-b32f52.netlify.app";
    default:
      return hostName;
  }
};

export const getPreviousCollectionAddress = () => {
  const previousCollectionAddress = localStorage.getItem("current-collection");
  if (previousCollectionAddress) {
    return JSON?.parse(previousCollectionAddress);
  }
};

export const copyToClipboard = (text: string) => {
  window.navigator.clipboard.writeText(text);
};

export const addOpacity = (color: string, opacity: number) => {
  // coerce values so it is between 0 and 1.
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
};

export const updateFavicon = (url: string) => {
  let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.getElementsByTagName("head")?.[0]?.appendChild(link);
  }
  link.href = url;
};

export const updateSiteTitle = (text: string) => {
  document.title = text || "";
};

export const getOnePercentFee = (tokenValueDecimals: number) => {
  return Number(
    convertTokenAmountToDecimal(tokenValueDecimals * 0.01).toFixed(0)
  );
};
export const getOnePercentFeeToken = (
  tokenValueDecimals: number,
  decimals: number
) => {
  return Number(
    convertTokenAmountToDecimals(tokenValueDecimals * 0.01, decimals).toFixed(0)
  );
};

export const convertToIPFSImage = (image: string) => {
  if (image === undefined) return "";
  const imageUrl = image.replace("ipfs://", "https://ipfs.io/ipfs/");
  return imageUrl;
};

export function parseAttributesQueryParams(queryParamsString: string) {
  const queryObj: any = {};
  const queryParams = new URLSearchParams(queryParamsString);
  queryParams.forEach((value, key) => {
    if (key === "includeAttributes") {
      queryObj[key] = value === "true";
    } else {
      if (!queryObj.attributes) {
        queryObj.attributes = {};
      }
      const attributeKey = key.match(/\[(.*?)\]/)?.[1] || "";
      if (!queryObj.attributes[attributeKey]) {
        queryObj.attributes[attributeKey] = [];
      }
      queryObj.attributes[attributeKey].push(value);
    }
  });
  return queryObj;
}

// Function to filter objects based on query parameters
export function filterObjectsByAttributes(objects: any[], query: any) {
  query = parseAttributesQueryParams(query);
  if (!query.includeAttributes || !query.attributes) return objects;
  return objects.filter((obj) => {
    const attributes = obj.token.attributes;

    for (const [key, value] of Object.entries(query.attributes)) {
      const matchingAttribute = attributes.find(
        (attr: any) => attr.key === key
      );
      if (
        !matchingAttribute ||
        (Array.isArray(value) && !value.includes(matchingAttribute.value)) ||
        (!Array.isArray(value) && matchingAttribute.value !== value)
      ) {
        return false;
      }
    }

    return true;
  });
}
