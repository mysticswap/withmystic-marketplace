import { IoClose } from "react-icons/io5";
import "./SelectedFilter.css";

type Props = { trait: string; handleClick: (...args: any[]) => void };

const SelectedFilter = ({ trait, handleClick }: Props) => {
  return (
    <div className="selected_filter">
      {trait}
      <IoClose display="block" onClick={() => handleClick(trait)} />
    </div>
  );
};

export default SelectedFilter;
