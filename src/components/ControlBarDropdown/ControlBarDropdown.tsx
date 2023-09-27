import { RiArrowDownSLine } from "react-icons/ri";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import "./ControlBarDropdown.css";
import { BsCheck } from "react-icons/bs";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const ControlBarDropdown = () => {
  const dropdownRef = useRef(null);
  const [showDropdownOptions, setShowDropdownOptions] = useState(false);

  useOutsideClick(
    dropdownRef,
    setShowDropdownOptions,
    "control_dropdown_trigger"
  );

  const { dropdownOptions, selectedDropdownOption, setSelectedDropdownOption } =
    useHomeContext()!;
  return (
    <div className="control_dropdown_parent">
      <button
        className="control_dropdown_trigger"
        onClick={() => setShowDropdownOptions(!showDropdownOptions)}
      >
        {selectedDropdownOption} <RiArrowDownSLine size={20} />
      </button>

      {showDropdownOptions && (
        <div className="control_dropdown_list" ref={dropdownRef}>
          {dropdownOptions.map((option) => {
            const isSelected = selectedDropdownOption == option;
            return (
              <button
                key={option}
                onClick={() => {
                  setSelectedDropdownOption(option);
                  setShowDropdownOptions(false);
                }}
              >
                {option}
                {isSelected && <BsCheck size={15} display="block" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ControlBarDropdown;
