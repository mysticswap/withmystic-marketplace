export type ActivityObject = {
  tokenName: string;
  contractAddress: string;
  tokenId: string;
  seller: string;
  buyer?: string;
  price: string;
  type: ActivityType;
  image: string;
  domain: string;
};

export type ActivityType = "sale" | "offer" | "listing";
