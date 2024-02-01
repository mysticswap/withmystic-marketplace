import { getHostName } from "../../utils";
import { marketplaceInstance } from "../axios";

export const getMarketplaceClient = async () => {
  const hostname = getHostName();
  console.log(hostname);
  const request = await marketplaceInstance(
    `/get-marketplace-client/${hostname}`
  );
  return request.data;
};
