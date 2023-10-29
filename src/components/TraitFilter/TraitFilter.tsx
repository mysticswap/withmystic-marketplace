import { RiArrowUpSLine } from "react-icons/ri";
import "./TraitFilter.css";
import { useState } from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import StatusListItem from "../StatusListItem/StatusListItem";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import { AttributeV2 } from "../../types/reservoir-types/collection-traits.types";

type Props = {
  attribute: AttributeV2;
};

const TraitFilter = ({ attribute }: Props) => {
  const { selectedTraits, setSelectedTraits } = useHomeContext()!;
  const [showList, setShowlist] = useState(false);
  const traitValues = attribute.values;
  const [traitValuesTemp, setTraitValuesTemp] = useState(traitValues);
  const [inputValue, setInputValue] = useState("");

  const selectTrait = (isClicked: boolean, trait: string) => {
    if (!isClicked) {
      setSelectedTraits([
        ...selectedTraits,
        { type: attribute.key, value: trait },
      ]);
    } else {
      const updatedSelection = selectedTraits.filter((item) => {
        return !(item.type == attribute.key && item.value == trait);
      });
      setSelectedTraits(updatedSelection);
    }
  };

  const onSearch = (text: string) => {
    setInputValue(text);
    const query = text.toLowerCase();
    const searchResults = traitValues.filter((value) => {
      return value.value.toLowerCase().includes(query);
    });
    setTraitValuesTemp(searchResults);
  };

  const clearInput = () => {
    setInputValue("");
    setTraitValuesTemp(traitValues);
  };

  return (
    <div className="trait_filter">
      <button className="filter_trigger" onClick={() => setShowlist(!showList)}>
        {attribute.key}{" "}
        <RiArrowUpSLine
          className="status_down_arrow"
          aria-expanded={showList}
          size={20}
        />
      </button>

      <div className="trait_container" aria-expanded={showList}>
        <div className="trait_search">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
            value={inputValue}
          />
          {!inputValue ? (
            <IoSearchSharp size={20} color="gray" />
          ) : (
            <IoClose size={20} className="input_closer" onClick={clearInput} />
          )}
        </div>
        <div>
          {traitValuesTemp?.map((value) => {
            return (
              <StatusListItem
                key={value.value}
                text={value.value}
                subtext={value.count}
                handleClick={selectTrait}
                isForTraits={true}
                type={attribute.key}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TraitFilter;
