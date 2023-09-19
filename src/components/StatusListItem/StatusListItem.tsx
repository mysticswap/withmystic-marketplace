import { useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import "./StatusListItem.css";

type Props = { text: string };

const StatusListItem = ({ text }: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <li className="status_list_item" onClick={() => setIsClicked(!isClicked)}>
      {text} <Checkbox isClicked={isClicked} />
    </li>
  );
};

export default StatusListItem;
