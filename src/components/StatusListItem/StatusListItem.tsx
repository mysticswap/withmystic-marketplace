import { useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import "./StatusListItem.css";

type Props = { text: string; subtext?: string | number };

const StatusListItem = ({ text, subtext }: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <li className="status_list_item" onClick={() => setIsClicked(!isClicked)}>
      <div>
        <span>{text}</span> {subtext && <small>({subtext})</small>}
      </div>{" "}
      <Checkbox isClicked={isClicked} />
    </li>
  );
};

export default StatusListItem;
