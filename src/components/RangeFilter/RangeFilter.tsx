/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Value } from "../../types/rsv-types/collection-traits.types";
import "./RangeFilter.css";
type Props = {
  attData: Value[];
  handleClick?: (...args: any[]) => void;
};
const RangeFilter = ({ attData, handleClick }: Props) => {
  // const [arrayValues, setArrayValues] = useState<string[]>();
  const [minValue, setMinValue] = useState<string>();
  const [maxValue, setMaxValue] = useState<string>();

  const getNumbersArray = () => {
    const arrayNumbers: string[] = [];
    attData.map(({ value }) => {
      arrayNumbers.push(value);
    });

    arrayNumbers.sort();
    const length = arrayNumbers.length - 1;

    setMinValue(arrayNumbers?.[0]);
    setMaxValue(arrayNumbers?.[length]);
  };

  const handleChange = (isMin: boolean, e: string) => {
    if (isMin) {
      setMinValue(e);
    } else {
      setMaxValue(e);
    }
  };
  const fetchMinAndMax = () => {
    handleClick!(minValue, maxValue);
  };

  useEffect(() => {
    getNumbersArray();
  }, [attData]);

  return (
    <>
      <div className="nft_filter_range">
        <input
          type="number"
          placeholder="Min"
          value={minValue}
          onChange={(e) => handleChange(true, e.target.value)}
        />
        <p>to</p>
        <input
          type="number"
          placeholder="Max"
          value={maxValue}
          onChange={(e) => handleChange(false, e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          fetchMinAndMax();
        }}
        className="nft_filter_button"
      >
        Apply
      </button>
    </>
  );
};
export default RangeFilter;
