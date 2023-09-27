import { IoSearchSharp } from "react-icons/io5";
import "./ControlBarSearchInput.css";

const ControlBarSearchInput = () => {
  return (
    <div className="control_bar_search">
      <input type="text" placeholder="Search" />
      <IoSearchSharp size={20} />
    </div>
  );
};

export default ControlBarSearchInput;
