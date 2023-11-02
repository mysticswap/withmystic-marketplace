import { getHostName } from "../../utils";
import { marketplaceInstance } from "../axios";

export const getMarketplaceClient = async () => {
  const hostname = getHostName();
  const request = await marketplaceInstance("/get-marketplace-client", {
    params: { hostname },
  });
  return request.data;
};
