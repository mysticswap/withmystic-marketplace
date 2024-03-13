// import { IconType } from "react-icons";
import "./ActivityFilterButton.css";
import Checkbox from "../Checkbox/Checkbox";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

const AuctionButton = () => {
  const { setIsAuction, setCurrentToken } = useGlobalContext();
  const [isClicked, setIsClicked] = useState(false);

  const toggleSelection = () => {
    setIsClicked(!isClicked);
    setIsAuction(!isClicked);
    setCurrentToken(0);
  };

  return (
    <div className="auction_filter_button" onClick={toggleSelection}>
      <div>
        <Checkbox isClicked={isClicked} />
        <p>Auction to the highest bidder</p>
        {/* <activity.icon display="block" size={20} /> */}
      </div>
    </div>
  );
};

export default AuctionButton;
