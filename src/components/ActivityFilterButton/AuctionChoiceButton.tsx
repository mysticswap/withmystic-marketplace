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

const AuctionButton = () => {
  const { setIsAuction } = useGlobalContext();
  const [isClicked, setIsClicked] = useState(false);

  const toggleSelection = () => {
    setIsClicked(!isClicked);
    setIsAuction(!isClicked);
  };

  return (
    <div className="activity_filter_button" onClick={toggleSelection}>
      <div>
        <Checkbox isClicked={isClicked} />
        <p>Auction to the highest bidder</p>
        {/* <activity.icon display="block" size={20} /> */}
      </div>
    </div>
  );
};

export default AuctionButton;
