import { useState } from "react";
import { activityButtons } from "../../constants";
import ActivityFilterButton from "../ActivityFilterButton/ActivityFilterButton";
import "./ActivityFilters.css";

const ActivityFilters = () => {
  const [activities, setActivities] = useState(["sale"]);
  return (
    <div className="activity_filters">
      <p>Activity Filters</p>
      {activityButtons.map((button) => {
        return (
          <ActivityFilterButton
            key={button.activity}
            activity={button}
            activities={activities}
            setActivities={setActivities}
          />
        );
      })}
    </div>
  );
};

export default ActivityFilters;
