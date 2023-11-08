import { IconType } from "react-icons";
import "./ActivityFilterButton.css";
import Checkbox from "../Checkbox/Checkbox";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

type Props = {
  activity: {
    activity: string;
    icon: IconType;
    type: string;
  };
};

const ActivityFilterButton = ({ activity }: Props) => {
  const { selectedActivities, setSelectedActivities } = useGlobalContext();

  const isSelectedActivity = selectedActivities.some((item) => {
    return item == activity.type;
  });

  const [isClicked, setIsClicked] = useState(false);

  const toggleSelection = () => {
    const updatedActivities = selectedActivities.filter((item) => {
      return item !== activity.type;
    });

    isSelectedActivity
      ? !(selectedActivities.length < 2) &&
        setSelectedActivities(updatedActivities)
      : setSelectedActivities([...selectedActivities, activity.type]);
    !(selectedActivities.length < 2) && setIsClicked(!isClicked);
  };

  useEffect(() => {
    isSelectedActivity && setIsClicked(true);
  }, [selectedActivities]);

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
