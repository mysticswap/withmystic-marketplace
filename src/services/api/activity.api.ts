import { ActivityObject } from "../../types/activity.types";
import { marketplaceInstance } from "../axios";

export const postActivityToDB = async (activityObject: ActivityObject) => {
  const request = await marketplaceInstance.post(
    "/post-activity",
    activityObject
  );
  if (request.status === 201) {
    window.location.reload();
  }
  return request.data;
};
