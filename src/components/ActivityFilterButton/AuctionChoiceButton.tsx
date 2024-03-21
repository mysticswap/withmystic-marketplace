// import { IconType } from "react-icons";
import "./ActivityFilterButton.css";
import Checkbox from "../Checkbox/Checkbox";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { BiInfoCircle } from "react-icons/bi";
import InfoCircle from "../../assets/info.svg";
import Icon from "./Icon";

const AuctionButton = ({ disabled }: { disabled: boolean }) => {
  const { setIsAuction, setCurrentToken } = useGlobalContext();
  const [isClicked, setIsClicked] = useState(false);

  const toggleSelection = () => {
    setIsClicked(!isClicked);
    setIsAuction(!isClicked);
    setCurrentToken(0);
  };

  return (
    <div
      className="auction_filter_button"
      onClick={() => !disabled && toggleSelection()}
    >
      <div>
        <Checkbox isClicked={isClicked} />
        <p>Auction to the highest bidder</p>
        <Icon
          text={
            "The highest bid made before expiration date wins the auction and automatically triggers a sale. However, no sale happens unless the winning bid is equal to or higher than the listing price."
          }
        />
      </div>
    </div>
  );
};

export default AuctionButton;
