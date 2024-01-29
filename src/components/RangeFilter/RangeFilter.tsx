/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Value } from "../../types/rsv-types/collection-traits.types";
import "./RangeFilter.css";
type Props = {
  attData: Value[];
  handleClick?: (...args: any[]) => void;
};
const RangeFilter = ({ attData, handleClick }: Props) => {
  const [arrayValues, setArrayValues] = useState<string[]>();
  const [inputValue, setInputValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>();

  const getNumbersArray = () => {
    const arrayNumbers: string[] = [];
    attData.map(({ value }) => {
      arrayNumbers.push(value);
    });

    arrayNumbers.sort();
    setArrayValues(arrayNumbers);

    setMaxValue(arrayNumbers.length - 1);
  };

  const currentValue = (e: string) => {
    setInputValue(parseInt(e));
  };

  useEffect(() => {
    getNumbersArray();
  }, [attData]);

  return (
    <div className="nft_filter_slider">
      <input
        type="range"
        value={inputValue}
        max={maxValue}
        onChange={(e) => currentValue(e.target.value)}
        onClick={() => {
          handleClick?.(arrayValues?.[inputValue!]);
        }}
        // onMouseDown={}
      ></input>
      <p>{arrayValues?.[inputValue!]}</p>
    </div>
  );
};
export default RangeFilter;
