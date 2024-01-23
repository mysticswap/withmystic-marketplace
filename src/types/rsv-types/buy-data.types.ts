/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BuyData {
  requestId: string;
  steps: Step[];
  errors: any[];
  path: Path[];
}

export interface Path {
  orderId: string;
  contract: string;
  tokenId: string;
  quantity: number;
  source: string;
  currency: string;
  currencySymbol: string;
  currencyDecimals: number;
  quote: number;
  rawQuote: string;
  builtInFees: any[];
  feesOnTop: any[];
  totalPrice: number;
  totalRawPrice: string;
}

export interface Step {
  id: string;
  action: string;
  description: string;
  kind: string;
  items: Item[];
}

export interface Item {
  kind?: string;
  status: string;
  orderIds?: string[];
  data: Data;
  check?: Check;
  gasEstimate?: number;
}

export interface Check {
  endpoint: string;
  method: string;
  body: Body;
}

export interface Body {
  kind: string;
}

export interface Data {
  from: string;
  to: string;
  data: string;
  value?: string;
  check?: Check;
  post?: Post;
  sign?: Sign;
}

export type Post = {
  endpoint: string;
  method: string;
  body: {
    id: string;
    kind: string;
  };
};

export type Sign = {
  message: string;
  signatureKind: string;
};
