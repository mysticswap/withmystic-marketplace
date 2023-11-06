export type ListOrOfferType = {
  endTime: string;
  chainId: number;
  offerer: string;
  offer: Items[];
  consideration: Items[];
  takerAddress: string;
  creatorAddress: string;
  type: "Swap" | "Listing" | "offer";
};

type Items = {
  itemtype: string;
  token: string;
  identifier: string;
  amount: string;
};

export type PayloadVerify = {
  signature: string;
  swapId: any;
};
