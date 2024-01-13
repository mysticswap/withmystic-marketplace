/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import "./StatusListItem.css";
import { SupportedTokens } from "../../types/dynamic-system.types";

type Props = {
  // handleClick: () => void;
  currency: string | undefined;
  setCurrency: React.Dispatch<React.SetStateAction<string | undefined>>;
  token: SupportedTokens;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const CurrencyListItem = ({
  // handleClick,
  // currency,
  setCurrency,
  token,
  isClicked,
  setIsClicked,
}: Props) => {
  // console.log({ isClicked });
  return (
    <li
      className="status_list_item"
      onClick={() => {
        setIsClicked((isClicked) => !isClicked);
        setCurrency(isClicked ? token.contract : undefined);
      }}
    >
      <div>
        <img src={token.metadata.image} alt="" className="currency_image" />
        <span>{token.symbol}</span>
      </div>{" "}
      <Checkbox isClicked={isClicked} />
    </li>
  );
};

export default CurrencyListItem;
