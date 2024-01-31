/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Value } from "../../types/rsv-types/collection-traits.types";
import "./RangeFilter.css";
type Props = {
  attData: Value[];
  handleClick?: (...args: any[]) => void;
};
const RangeFilter = ({ attData, handleClick }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isError, setIsError] = useState(false);
  const [minValue, setMinValue] = useState<string>();
  const [maxValue, setMaxValue] = useState<string>();

  const getNumbersArray = () => {
    const arrayNumbers: string[] = [];
    attData.map(({ value }) => {
      arrayNumbers.push(value);
    });

    arrayNumbers.sort();
    const length = arrayNumbers.length - 1;

    return { arrayNumbers, length };
  };

  const handleChange = (isMin: boolean, e: string) => {
    if (isMin) {
      setMinValue(e);
    } else {
      setMaxValue(e);
    }
  };
  const fetchMinAndMax = () => {
    const { arrayNumbers, length } = getNumbersArray();

    if (minValue != arrayNumbers?.[0] || maxValue != arrayNumbers?.[length]) {
      handleClick!(minValue, maxValue);
    }
  };

  useEffect(() => {
    const { arrayNumbers, length } = getNumbersArray();
    setMinValue(arrayNumbers?.[0]);
    setMaxValue(arrayNumbers?.[length]);
  }, [attData]);

  useEffect(() => {
    if (parseInt(minValue!) > parseInt(maxValue!)) {
      setIsError(true);
      buttonRef.current?.toggleAttribute("disabled", true);
    } else {
      setIsError(false);
      buttonRef.current?.toggleAttribute("disabled", false);
    }
  }, [minValue, maxValue]);

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
        ref={buttonRef}
      >
        Apply
      </button>
      {isError && (
        <p className="max_error">Minimum must be less than maximum</p>
      )}
    </>
  );
};
export default RangeFilter;
