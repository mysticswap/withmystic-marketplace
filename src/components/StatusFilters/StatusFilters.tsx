import { useState } from "react";
import "./StatusFilters.css";
import { RiArrowUpSLine } from "react-icons/ri";
import StatusListItem from "../StatusListItem/StatusListItem";

const StatusFilters = () => {
  const [showList, setShowlist] = useState(false);
  return (
    <div className="status_container">
      <button className="filter_trigger" onClick={() => setShowlist(!showList)}>
        Status{" "}
        <RiArrowUpSLine
          className="status_down_arrow"
          aria-expanded={showList}
          size={20}
        />
      </button>
      <ul className="status_list" aria-expanded={showList}>
        <StatusListItem text="Buy now only" />
        <StatusListItem text="Local listings only" />
      </ul>
    </div>
  );
};

export default StatusFilters;
