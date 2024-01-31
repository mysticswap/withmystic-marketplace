/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoClose } from "react-icons/io5";
import "./SelectedFilter.css";

type Props = {
  trait: string;
  traitType: string;
  min?: string;
  max?: string;
  handleClick: (...args: any[]) => void;
};

const SelectedFilter = ({ trait, traitType, min, max, handleClick }: Props) => {
  return (
    <div className="selected_filter">
      {!min ? (
        <>{trait}</>
      ) : (
        <p>
          {min} to {max}
        </p>
      )}
      <IoClose display="block" onClick={() => handleClick(trait, traitType)} />
    </div>
  );
};

export default SelectedFilter;
