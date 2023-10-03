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
