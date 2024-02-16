import { RiArrowLeftSLine } from "react-icons/ri";
import { useWalletContext } from "../../context/WalletContext/WalletContext";
import "./FilterButton.css";
import { IoOptionsOutline } from "react-icons/io5";
import { useIsMobile } from "../../hooks/useIsMobile";

const FilterButton = () => {
  const {
    setShowFilters,
    showFilters,
    // selectedTraits,
    setShowMobileFilters,
    showMobileFilters,
  } = useWalletContext()!;
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
      {/* {selectedTraits.length > 0 && (
        <div className="filter_counter">{selectedTraits.length}</div>
      )} */}
    </button>
  );
};

export default FilterButton;
