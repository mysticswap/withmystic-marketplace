import { useState } from "react";
import "./NumericFilters.css";
import { RiArrowUpSLine } from "react-icons/ri";

type Props = {
  title: string;
};

const NumericFilters = ({ title }: Props) => {
  const [showList, setShowlist] = useState(false);

  return (
    <div className="ms_mp_numeric_filter">
      <button
        className="ms_mp_filter_trigger"
        onClick={() => setShowlist(!showList)}
      >
        {title}{" "}
        <RiArrowUpSLine
          className="ms_mp_status_down_arrow"
          aria-expanded={showList}
          size={20}
        />
      </button>
      <div className="ms_mp_minmax" aria-expanded={showList}>
        <input type="text" placeholder="Min" /> to
        <input type="text" placeholder="Max" />
      </div>
    </div>
  );
};

export default NumericFilters;
