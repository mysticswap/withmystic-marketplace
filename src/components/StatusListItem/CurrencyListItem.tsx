/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
import "./StatusListItem.css";
import { SupportedToken } from "../../types/dynamic-system.types";
import CurrencyCheckbox from "../Checkbox/CurrencyCheckbox";

type Props = {
  // handleClick: () => void;
  currency: string | undefined;
  setCurrency: React.Dispatch<React.SetStateAction<string | undefined>>;
  token: SupportedToken;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number | undefined;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  tokenIndex: number;
};

const CurrencyListItem = ({
  // handleClick,
  // currency,
  setCurrency,
  token,
  isClicked,
  setIsClicked,
  currentIndex,
  setCurrentIndex,
  tokenIndex,
}: Props) => {
  const handleClick = () => {
    setCurrency(isClicked ? undefined : token.contract);
    setIsClicked(!isClicked);
    setCurrentIndex(() => {
      if (tokenIndex === currentIndex) {
        setIsClicked(false);
        return undefined;
      } else {
        setIsClicked(true);
        return tokenIndex;
      }
    });
  };

  return (
    <li className="status_list_item" onClick={handleClick}>
      <div>
        <img src={token.image} alt="" className="currency_image" />
        <span>{token.symbol}</span>
      </div>{" "}
      <CurrencyCheckbox
        isClicked={isClicked}
        currentIndex={currentIndex}
        tokenIndex={tokenIndex}
      />
    </li>
  );
};

export default CurrencyListItem;
