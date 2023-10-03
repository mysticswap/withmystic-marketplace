import { IoClose } from "react-icons/io5";
import "./SelectedFilter.css";

type Props = {
  trait: string;
  traitType: string;
  handleClick: (...args: any[]) => void;
};

const SelectedFilter = ({ trait, traitType, handleClick }: Props) => {
  return (
    <div className="selected_filter">
      {trait}
      <IoClose display="block" onClick={() => handleClick(trait, traitType)} />
    </div>
  );
};

export default SelectedFilter;
