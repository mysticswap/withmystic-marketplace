import "./ControlBar.css";
import GridButtons from "../GridButtons/GridButtons";
import ControlBarDropdown from "../ControlBarDropdown/ControlBarDropdown";
import FilterButton from "../FilterButton/FilterButton";
import ControlBarSearchInput from "../ControlBarSearchInput/ControlBarSearchInput";

type Props = {
  isInItemsSection: boolean;
};

const ControlBar = ({ isInItemsSection }: Props) => {
  return (
    <div className={`control_bar ${isInItemsSection ? "" : "hide"}`}>
      <FilterButton />
      <ControlBarSearchInput />
      <ControlBarDropdown />
      <GridButtons />
    </div>
  );
};

export default ControlBar;
