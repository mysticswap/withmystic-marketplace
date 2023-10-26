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
  return hostName.includes("localhost")
    ? "marketplace.mysticswap.io"
    : hostName;
};
