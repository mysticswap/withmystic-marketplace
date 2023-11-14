import { DiscordPostBody } from "../../types/discord-post.types";
import { marketplaceInstance } from "../axios";

export const postSale = async (data: DiscordPostBody) => {
  const request = await marketplaceInstance.post("/post-sale", data);
  return request.data;
};
