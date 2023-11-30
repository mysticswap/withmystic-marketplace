import { BsFillCartFill, BsTagFill } from "react-icons/bs";
import { FaMoneyBillTransfer, FaRectangleList } from "react-icons/fa6";
import { IoSparklesSharp } from "react-icons/io5";
import { addDays, addHours, addMonths } from "../utils/date-utils";
import maticIcon from "../assets/matic-logo.svg";
import ethereumIcon from "../assets/ethereum-1.svg";

export const reservoirActivityTypes = JSON.stringify([
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
};

export const scanWebsites: { [x: number]: string } = {
  5: "https://goerli.etherscan.io/",
  1: "https://etherscan.io/",
  137: "https://polygonscan.com/",
};

export const chainIdsMap: { [x: number]: string } = {
  1: "0x1",
  5: "0x5",
  137: "0x89",
};

export const collectionNetworkIcon: { [x: number]: string } = {
  1: ethereumIcon,
  5: ethereumIcon,
  137: maticIcon,
};

export const balanceChain: { [x: number]: string } = {
  1: "ETH",
  5: "ETH",
  137: "WETH",
};

export const collectionsWithHiddenNames: { [x: string]: boolean } = {
  "0x1c1726327a364e496aa3e7a032b04af265631ded": true,
  "0x73382b19fe136907e9fd4cb1d55228237566324c": true,
};
