import { RiArrowDownSLine } from "react-icons/ri";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import "./ControlBarDropdown.css";
import { BsCheck } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { getCollectionNftsV2 } from "../../services/api/marketplace-reservoir-api";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { generateAttributeString } from "../../utils";
import { collectionContract } from "../../config";
import { dropdownOptions } from "../../constants";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";

const ControlBarDropdown = () => {
  const { chainId } = useConnectionContext()!;
  const { setCollectionNfts, collectionChainId } = useGlobalContext()!;
  const {
    selectedDropdownOption,
    setSelectedDropdownOption,
    selectedTraits,
    setIsFetching,
    numericFilters,
  } = useHomeContext()!;

  const dropdownRef = useRef(null);

  const [showDropdownOptions, setShowDropdownOptions] = useState(false);

  useOutsideClick(
    dropdownRef,
    setShowDropdownOptions,
    "control_dropdown_trigger"
  );

  useEffect(() => {
    const attribute = generateAttributeString(selectedTraits);
    setCollectionNfts({ tokens: [], continuation: null });
    setIsFetching(true);
    getCollectionNftsV2(
      collectionChainId! || chainId,
      selectedDropdownOption.value,
      selectedDropdownOption.order,
      collectionContract,
      undefined,
      undefined,
      attribute,
      numericFilters
    )
      .then((result) => setCollectionNfts(result))
      .finally(() => {
        setIsFetching(false);
      });
  }, [selectedDropdownOption]);

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

export default ControlBarDropdown;
