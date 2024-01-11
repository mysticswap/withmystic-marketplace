/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import "./StatusListItem.css";
import { SupportedTokens } from "../../types/dynamic-system.types";

type Props = {
  handleClick?: (...args: any[]) => void;
  setCurrency: React.Dispatch<React.SetStateAction<string | undefined>>;
  token: SupportedTokens;
};

const CurrencyListItem = ({ handleClick, setCurrency, token }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  // useEffect(() => {
  //   if (isForTraits) {
  //     const isSelected = selectedTraits.some((trait) => {
  //       return trait.value == text && trait.type == type;
  //     });
  //     setIsClicked(isSelected);
  //   }
  // }, [selectedTraits]);

  return (
    <li
      className="status_list_item"
      onClick={() => {
        setIsClicked((clicked) => !clicked);
        handleClick?.();
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
