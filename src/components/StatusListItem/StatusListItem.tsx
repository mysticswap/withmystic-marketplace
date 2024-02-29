/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import "./StatusListItem.css";
import { useCollectionContext } from "../../context/CollectionContext/CollectionContext";

type Props = {
  text: string;
  subtext?: string | number;
  handleClick?: (...args: any[]) => void;
  isForTraits?: boolean;
  type?: string;
};

const StatusListItem = ({
  text,
  subtext,
  handleClick,
  isForTraits,
  type,
}: Props) => {
  const { selectedTraits } = useCollectionContext()!;
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isForTraits) {
      const isSelected = selectedTraits.some((trait) => {
        return trait.value == text && trait.type == type;
      });
      setIsClicked(isSelected);
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
