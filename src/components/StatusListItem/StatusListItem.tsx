import { useEffect, useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import "./StatusListItem.css";
import { useHomeContext } from "../../context/HomeContext";

type Props = {
  text: string;
  subtext?: string | number;
  handleClick?: (...args: any[]) => void;
  isForTraits?: boolean;
};

const StatusListItem = ({ text, subtext, handleClick, isForTraits }: Props) => {
  const { selectedTraits } = useHomeContext()!;
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isForTraits) {
      const isSelected = selectedTraits.some((trait) => {
        return trait == text;
      });
      !isSelected && setIsClicked(false);
    }
  }, [selectedTraits]);
  return (
    <li
      className="status_list_item"
      onClick={() => {
        setIsClicked(!isClicked);
        handleClick?.(isClicked, text);
      }}
    >
      <div>
        <span>{text}</span> {subtext && <small>({subtext})</small>}
      </div>{" "}
      <Checkbox isClicked={isClicked} />
    </li>
  );
};

export default StatusListItem;
