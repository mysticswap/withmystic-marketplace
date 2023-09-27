import { RiArrowLeftSLine } from "react-icons/ri";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import "./FilterButton.css";
import { IoOptionsOutline } from "react-icons/io5";

const FilterButton = () => {
  const { setShowFilters, showFilters, selectedTraits } = useHomeContext()!;
  return (
    <button
      className="filter_button"
      onClick={() => setShowFilters(!showFilters)}
    >
      {showFilters ? (
        <RiArrowLeftSLine size={20} />
      ) : (
        <IoOptionsOutline size={20} />
      )}{" "}
      Filters{" "}
      {selectedTraits.length > 0 && (
        <div className="filter_counter">{selectedTraits.length}</div>
      )}
    </button>
  );
};

export default FilterButton;
