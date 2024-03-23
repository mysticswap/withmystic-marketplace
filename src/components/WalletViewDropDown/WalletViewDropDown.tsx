import { useEffect, useRef, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import { useOutsideClick } from "../../hooks/useOutsideClick";
type props = {
  setView: React.Dispatch<React.SetStateAction<boolean>>;
};
const WalletViewDropDown = ({ setView }: props) => {
  const dropdownOptions = [{ title: "All" }, { title: "Local" }];
  const [showDropdownOptions, setShowDropdownOptions] = useState(false);
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(
    dropdownOptions[0]
  );

  const dropdownRef = useRef(null);

  useOutsideClick(
    dropdownRef,
    setShowDropdownOptions,
    "control_dropdown_trigger"
  );

  useEffect(() => {
    const handleView = () => {
      if (selectedDropdownOption.title == "All") {
        setView(true);
      } else {
        setView(false);
      }
    };
    handleView();
  }, [selectedDropdownOption]);

  return (
    <div className="control_dropdown_parent">
      <button
        className="control_dropdown_trigger"
        onClick={() => setShowDropdownOptions(!showDropdownOptions)}
      >
        {selectedDropdownOption.title}
        <RiArrowDownSLine size={20} />
      </button>

      {showDropdownOptions && (
        <div className="control_dropdown_list" ref={dropdownRef}>
          {dropdownOptions.map((option) => {
            const isSelected = selectedDropdownOption.title == option.title;
            return (
              <button
                key={option.title}
                onClick={() => {
                  setSelectedDropdownOption(option);
                  setShowDropdownOptions(false);
                }}
              >
                {option.title}
                {isSelected && <BsCheck size={15} display="block" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default WalletViewDropDown;
