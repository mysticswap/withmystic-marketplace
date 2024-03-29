export type ClientObject = {
  _id: string;
  hostname: string;
  bannerUrl: string;
  logoUrl: string;
  favicon: string;
  htmlTitle: string;
  collections: MarketplaceClientCollection[];
  styles: MarketplaceClientStyles;
  __v: number;
  fonts: {
    fontFamily: string;
    fontLinks: string;
  };
  apiKey: string;
};

export type MarketplaceClientCollection = {
  id: string;
  name: string;
  address: string;
  chainId: number;
  supportedTokens?: SupportedToken[];
};

export type SupportedToken = {
  contract: string;
  name: string;
  symbol: string;
  decimals: number;
  image: string;
};

export type MarketplaceClientStyles = {
  bodyBackground: string;
  primaryColor: string;
  primaryDarkShade: string;
  textColor: string;
  cardBorderColor: string;
  cardBorderRadius: string;
  controlBarHoverColor: string;
  buttonBorderRadius: string;
};
