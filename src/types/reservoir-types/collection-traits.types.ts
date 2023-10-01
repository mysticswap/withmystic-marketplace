export interface CollectionTraits {
  attributes: Attribute[];
}

export interface Attribute {
  key: string;
  attributeCount: number;
  kind: string;
  values: Value[];
}

export interface Value {
  count: number;
  value: string;
  floorAskPrice?: FloorAskPrice;
}

export interface FloorAskPrice {
  currency: Currency;
  amount: Amount;
}

export interface Amount {
  raw: string;
  decimal: number;
  usd: number;
  native: number;
}

export interface Currency {
  contract: string;
  name: string;
  symbol: string;
  decimals: number;
}
