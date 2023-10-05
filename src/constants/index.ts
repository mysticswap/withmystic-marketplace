import { BsFillCartFill, BsTagFill } from "react-icons/bs";
import { FaMoneyBillTransfer, FaRectangleList } from "react-icons/fa6";
import { IoSparklesSharp } from "react-icons/io5";

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
