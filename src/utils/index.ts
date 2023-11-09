import { SelectedTrait } from "../context/HomeContext/types";
import {
  Market,
  TokenToken,
} from "../types/reservoir-types/collection-nfts.types";

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

export const metamaskPresent = () => {
  var ethereum = window.ethereum;
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
  address && window.open(`https://mysticswap.io/wallet-view/${address}`);
};

export const generateAttributeString = (selectedTraits: SelectedTrait[]) => {
  let string = "";
  selectedTraits.forEach((item) => {
    string += `&attributes[${item.type}]=${item.value}`;
  });
  return string;
};

export const getHostName = () => {
  const hostName = window.location.hostname;
  switch (hostName) {
    case "localhost":
      return "market.localhost.io";
      return "marketplace.mysticswap.io";
      return "market.roo.io";
    case "deploy-preview-7--heroic-duckanoo-b32f52.netlify.app":
      return "marketplace.mysticswap.io";
      return "market.localhost.io";
    default:
      return hostName;
  }
};

export const getPreviousCollectionAddress = () => {
  let previousCollectionAddress = localStorage.getItem("current-collection");
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
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    //@ts-ignore
    link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  //@ts-ignore
  link.href = url;
};

export const updateSiteTitle = (text: string) => {
  document.title = text || "";
};
