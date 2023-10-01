import axios from "axios";
import { API_KEY, BASE_API } from "../config";

export const marketplaceInstance = axios.create({
  baseURL: `${BASE_API}/marketplace-api`,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});
