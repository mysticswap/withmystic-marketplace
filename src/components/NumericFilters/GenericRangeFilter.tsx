import { useState } from "react";
import "./NumericFilters.css";
import { RiArrowUpSLine } from "react-icons/ri";

type Props = {
  title: string;
  minValue: number | null;
  setMinValue: (newValue: number | null) => void;
  maxValue: number | null;
  setMaxValue: (newValue: number | null) => void;
};

const GenericRangeFilter = ({
  title,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
}: Props) => {
  const [showList, setShowlist] = useState(false);

  const showError = minValue !== null && maxValue !== null && minValue > maxValue

  const handleChange = (
    newValue: string,
    setter: (newValue: number | null) => void
  ) => {
    if (newValue === "") return setter(null);
    const n = Number(newValue)
    if(!isNaN(n)) {
      setter(n);
    }
  };

  return (
    <div className="numeric_filter">
      <button className="filter_trigger" onClick={() => setShowlist(!showList)}>
        {title}{" "}
        <RiArrowUpSLine
          className="status_down_arrow"
          aria-expanded={!showList}
          size={20}
        />
      </button>
      <div className="minmax" aria-expanded={!showList}>
        <input
          type="text"
          placeholder="Min"
          value={minValue || ""}
          onChange={(e) => {
            handleChange(e.target.value, setMinValue);
          }}
        />{" "}
        to
        <input
          type="text"
          placeholder="Max"
          value={maxValue || ""}
          onChange={(e) => {
            handleChange(e.target.value, setMaxValue);
          }}
        />
      </div>
      {showError && <p className="numeric_input_error">Min value is higher than Max value</p>}
    </div>
  );
};

export default GenericRangeFilter;
