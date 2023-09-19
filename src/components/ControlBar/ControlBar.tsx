import { IoOptionsOutline, IoSearchSharp } from "react-icons/io5";
import { RiArrowDownSLine, RiArrowLeftSLine } from "react-icons/ri";
import { BsFillGridFill, BsFillGrid3X3GapFill } from "react-icons/bs";
import "./ControlBar.css";
import { useHomeContext } from "../../context/HomeContext";

const ControlBar = () => {
  const { setShowFilters, showFilters, setMinimalCards, minimalCards } =
    useHomeContext()!;
  return (
    <div className="ms_mp_control_bar">
      <button
        className="ms_mp_filter_button"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? (
          <RiArrowLeftSLine size={20} />
        ) : (
          <IoOptionsOutline size={20} />
        )}{" "}
        Filters
      </button>

      <div className="ms_mp_control_bar_search">
        <input type="text" placeholder="Search" />
        <IoSearchSharp size={20} />
      </div>

      <div className="ms_mp_control_dropdown_parent">
        <button className="ms_mp_control_dropdown_trigger">
          Newest <RiArrowDownSLine size={20} />
        </button>
      </div>

      <div className="ms_mp_grid_buttons">
        <button
          onClick={() => {
            setMinimalCards(true);
          }}
        >
          <BsFillGridFill opacity={minimalCards ? 0.25 : 1} size={20} />
        </button>
        <button
          onClick={() => {
            setMinimalCards(false);
          }}
        >
          <BsFillGrid3X3GapFill opacity={!minimalCards ? 0.25 : 1} size={20} />
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
