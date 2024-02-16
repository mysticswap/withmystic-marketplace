import { RiArrowDownSLine } from "react-icons/ri";
import { useWalletContext } from "../../context/WalletContext/WalletContext";
import "./ControlBarDropdown.css";
import { BsCheck } from "react-icons/bs";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { dropdownOptions } from "../../constants";

const WalletControlBarDropdown = () => {
  const {
    selectedDropdownOption,
    setSelectedDropdownOption,
  } = useWalletContext()!;

  const dropdownRef = useRef(null);

  const [showDropdownOptions, setShowDropdownOptions] = useState(false);

  useOutsideClick(
    dropdownRef,
    setShowDropdownOptions,
    "control_dropdown_trigger"
  );

  return (
    <div className="control_dropdown_parent">
      <button
        className="control_dropdown_trigger"
        onClick={() => setShowDropdownOptions(!showDropdownOptions)}
      >
        {selectedDropdownOption.title} <RiArrowDownSLine size={20} />
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

export default WalletControlBarDropdown;
