import { ActivityObject } from "../../types/activity.types";
import { marketplaceInstance } from "../axios";

export const postActivityToDB = async (activityObject: ActivityObject) => {
  const request = await marketplaceInstance.post(
    "/post-activity",
    activityObject
  );
  return request.data;
};
