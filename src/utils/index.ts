import { SingleNftData } from "../types/alchemy.types";

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

export const metamaskPresent = () => {
  var ethereum = window.ethereum;
  return typeof ethereum !== "undefined" && window.ethereum.isMetaMask;
};

export const extractMetadata = (nft: SingleNftData) => {
  return {
    collectionName: nft?.contract?.name,
    nftName: nft?.rawMetadata?.name,
    nftImage: nft?.media[0]?.gateway,
    ethAmount: 4,
    price: 123,
    floorPrice: nft?.contract?.openSea?.floorPrice,
  };
};

export const formatOnlyDecimals = (x: number) => {
  return (x * 1.5).toFixed(2).replace(/[.,]00$/, "");
};

export const redirectToMSWalletPage = (address: string) => {
  address && window.open(`https://mysticswap.io/wallet-view/${address}`);
};
