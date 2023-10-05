import { IconType } from "react-icons";
import "./ActivityFilterButton.css";
import Checkbox from "../Checkbox/Checkbox";
import { useEffect, useState } from "react";

type Props = {
  activity: {
    activity: string;
    icon: IconType;
    type: string;
  };
  activities: string[];
  setActivities: React.Dispatch<React.SetStateAction<string[]>>;
};

const ActivityFilterButton = ({
  activity,
  activities,
  setActivities,
}: Props) => {
  const isSelectedActivity = activities.some((item) => {
    return item == activity.type;
  });

  const [isClicked, setIsClicked] = useState(false);

  const toggleSelection = () => {
    const updatedActivities = activities.filter((item) => {
      return item !== activity.type;
    });
    isSelectedActivity
      ? setActivities(updatedActivities)
      : setActivities([...activities, activity.type]);
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    isSelectedActivity && setIsClicked(true);
  }, [activities]);

  return (
    <button className="activity_filter_button" onClick={toggleSelection}>
      <div>
        {activity.activity}
        <activity.icon display="block" size={20} />
      </div>
      <Checkbox isClicked={isClicked} />
    </button>
  );
};

export default ActivityFilterButton;
