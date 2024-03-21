import { BsFillCartFill, BsTagFill } from "react-icons/bs";
import { FaMoneyBillTransfer, FaRectangleList } from "react-icons/fa6";
import { IoSparklesSharp } from "react-icons/io5";
import { addDays, addHours, addMonths } from "../utils/date-utils";
import maticIcon from "../assets/matic-logo.svg";
import ethereumIcon from "../assets/ethereum-1.svg";
import { SupportedToken } from "../types/dynamic-system.types";

export const rsvActivityTypes = JSON.stringify([
  "sale",
  "ask",
  "bid",
  "transfer",
  "mint",
]);

export const activityRenames = {
  sale: "Sale",
  ask: "Listing",
  bid: "Offer",
  transfer: "Transfer",
  mint: "Mint",
};

export const dropdownOptions = [
  { title: "Price: Low to High", value: "floorAskPrice", order: "asc" },
  { title: "Price: High to Low", value: "floorAskPrice", order: "desc" },
  { title: "Rarity: Low to High", value: "rarity", order: "asc" },
  { title: "Rarity: High to Low", value: "rarity", order: "desc" },
  { title: "Token ID: Low to High", value: "tokenId", order: "asc" },
];

export const tabOptions = ["Items", "Activity"];

export const activityButtons = [
  { activity: "Sale", icon: BsFillCartFill, type: "sale" },
  { activity: "Offers", icon: BsTagFill, type: "bid" },
  { activity: "Listings", icon: FaRectangleList, type: "ask" },
  { activity: "Transfer", icon: FaMoneyBillTransfer, type: "transfer" },
  { activity: "Mint", icon: IoSparklesSharp, type: "mint" },
];

export const defaultNumericFilters = {
  minRarityRank: "",
  maxRarityRank: "",
  minFloorAskPrice: "",
  maxFloorAskPrice: "",
};

export const durationOptions = [
  { title: "1 Hour", time: addHours(1) },
  { title: "12 Hours", time: addHours(12) },
  { title: "1 Day", time: addDays(1) },
  { title: "3 Days", time: addDays(3) },
  { title: "1 Week", time: addDays(7) },
  { title: "1 Month", time: addMonths(1) },
  { title: "3 Months", time: addMonths(3) },
  { title: "6 Months", time: addMonths(6) },
];

export const wethAddresses: { [x: number]: string } = {
  1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  5: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
  137: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
  42161: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  81457: "0x4300000000000000000000000000000000000004",
};

export const offerTokens: Record<number, Array<SupportedToken>> = {
  1: [
    {
      contract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      name: "Tether USD",
      decimals: 6,
      symbol: "USDT",
      image:
        "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
    },
    {
      contract: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      name: "USD Coin",
      decimals: 6,
      symbol: "USDC",
      image:
        "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    },
    {
      contract: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      name: "Wrapped BTC",
      decimals: 18,
      symbol: "WBTC",
      image:
        "https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400",
    },
  ],
  5: [
    {
      contract: "0x509Ee0d083DdF8AC028f2a56731412edD63223B9",
      name: "Tether USD",
      decimals: 6,
      symbol: "USDT",
      image:
        "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
    },
    {
      contract: "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C",
      name: "USD Coin",
      decimals: 6,
      symbol: "USDC",
      image:
        "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    },
    {
      contract: "0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05",
      name: "Wrapped BTC",
      decimals: 18,
      symbol: "WBTC",
      image:
        "https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400",
    },
  ],
  137: [
    {
      contract: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      name: "Tether USD",
      decimals: 6,
      symbol: "USDT",
      image:
        "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
    },
    {
      contract: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
      name: "USD Coin",
      decimals: 6,
      symbol: "USDC",
      image:
        "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    },
    {
      contract: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
      name: "Wrapped BTC",
      decimals: 18,
      symbol: "WBTC",
      image:
        "https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400",
    },
  ],

  42161: [
    {
      contract: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      name: "Tether USD",
      decimals: 6,
      symbol: "USDT",
      image:
        "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
    },
    {
      contract: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      name: "USD Coin",
      decimals: 6,
      symbol: "USDC",
      image:
        "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    },
    {
      contract: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
      name: "Wrapped BTC",
      decimals: 18,
      symbol: "WBTC",
      image:
        "https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400",
    },
  ],

  81457: [
    {
      contract: "0x4300000000000000000000000000000000000003",
      name: "Native Blast USD",
      decimals: 6,
      symbol: "USDB",
      image: "https://blastscan.io/token/images/usdb_32.png",
    },
  ],
};

export const defaultSort = "floorAskPrice";
export const defaultSortby = "asc";

export const defaultOfferOrList = {
  collectionName: "",
  nftName: "",
  nftImage: "",
  amount: 0,
  price: 0,
  isOffer: true,
  isSale: false,
  tokenId: "",
  message: "",
  nftOwner: "",
  symbol: "",
  isBuyNow: false,
  nftType: "ERC721",
};

export const scanWebsites: { [x: number]: string } = {
  5: "https://goerli.etherscan.io/",
  1: "https://etherscan.io/",
  137: "https://polygonscan.com/",
  42161: "https://arbiscan.io/",
  81457: "https://blastscan.com/",
};

export const chainIdsMap: { [x: number]: string } = {
  1: "0x1",
  5: "0x5",
  137: "0x89",
  42161: "0xa4a1",
  81457: "0x13e31",
};

export const collectionNetworkIcon: { [x: number]: string } = {
  1: ethereumIcon,
  5: ethereumIcon,
  137: maticIcon,
  42161: ethereumIcon,
  81457: ethereumIcon,
};

export const balanceChain: { [x: number]: string } = {
  1: "ETH",
  5: "ETH",
  137: "MATIC",
  42161: "ETH",
  81457: "ETH",
};

export const collectionsWithHiddenNames: { [x: string]: boolean } = {
  "0x1c1726327a364e496aa3e7a032b04af265631ded": true,
  "0x73382b19fe136907e9fd4cb1d55228237566324c": true,
};
