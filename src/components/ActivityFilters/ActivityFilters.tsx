import { activityButtons } from "../../constants";
import ActivityFilterButton from "../ActivityFilterButton/ActivityFilterButton";
import "./ActivityFilters.css";

const ActivityFilters = () => {
  return (
    <div className="activity_filters">
      <p>Activity Filters</p>
      {activityButtons.map((button) => {
        return <ActivityFilterButton key={button.activity} activity={button} />;
      })}
    </div>
  );
};

export default ActivityFilters;
