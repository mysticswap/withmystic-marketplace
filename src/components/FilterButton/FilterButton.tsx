import { RiArrowLeftSLine } from "react-icons/ri";
import { useCollectionContext } from "../../context/CollectionContext/CollectionContext";
import "./FilterButton.css";
import { IoOptionsOutline } from "react-icons/io5";
import { useIsMobile } from "../../hooks/useIsMobile";

const FilterButton = () => {
  const {
    setShowFilters,
    showFilters,
    selectedTraits,
    setShowMobileFilters,
    showMobileFilters,
  } = useCollectionContext()!;
  const isMobile = useIsMobile();

  return (
    <button
      className="filter_button"
      onClick={() => {
        !isMobile && setShowFilters(!showFilters);
        setShowMobileFilters(!showMobileFilters);
      }}
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
