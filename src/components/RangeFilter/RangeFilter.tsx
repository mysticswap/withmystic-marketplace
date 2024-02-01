/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { AttributeV2 } from "../../types/rsv-types/collection-traits.types";
import "./RangeFilter.css";
type Props = {
  attData: AttributeV2;
  handleClick: (minTrat: string, maxTrait: string) => void;
};
const RangeFilter = ({ attData, handleClick }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isError, setIsError] = useState(false);
  const [minValue, setMinValue] = useState<string>("0");
  const [maxValue, setMaxValue] = useState<string>("0");

  const getMinandMax = () => {
    const minData = attData.minRange!.toString();
    const maxData = attData.maxRange!.toString();
    return { minData, maxData };
  };

  const handleChange = (isMin: boolean, e: string) => {
    if (isMin) {
      setMinValue(e);
    } else {
      setMaxValue(e);
    }
  };
  const fetchMinAndMax = () => {
    const { minData, maxData } = getMinandMax();

    if (minValue != minData && maxValue != maxData) {
      handleClick(minValue, maxValue);
    }
  };

  useEffect(() => {
    const { minData, maxData } = getMinandMax();
    setMinValue(minData);
    setMaxValue(maxData);
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
