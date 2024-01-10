/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ListOrBidData {
  steps: Step[];
  errors: any[];
}

export interface Step {
  id: string;
  action: string;
  description: string;
  kind: string;
  items: Item[];
}

export interface Item {
  status: string;
  data: Data;
  orderIndexes: number[];
}

export interface Data {
  from?: string;
  to?: string;
  data?: string;
  sign?: Sign;
  post?: Post;
}

export interface Post {
  endpoint: string;
  method: string;
  body: Body;
}

export interface Body {
  order: Order;
  orderbook: string;
  source: string;
}

export interface Order {
  kind: string;
  data: Value;
}

export interface Value {
  kind: string;
  offerer: string;
  zone: string;
  offer: Consideration[];
  consideration: Consideration[];
  orderType: number;
  startTime: number;
  endTime: number;
  zoneHash: string;
  salt: string;
  conduitKey: string;
  counter: string;
  signature: string;
}

export interface Consideration {
  itemType: number;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
  recipient?: string;
}

export interface Sign {
  signatureKind: string;
  domain: Domain;
  types: Types;
  value: Value;
  primaryType: string;
}

export interface Domain {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
}

export interface Types {
  OrderComponents: ConsiderationItem[];
  OfferItem: ConsiderationItem[];
  ConsiderationItem: ConsiderationItem[];
}

export interface ConsiderationItem {
  name: string;
  type: string;
}
