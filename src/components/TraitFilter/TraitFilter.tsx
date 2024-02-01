import { RiArrowUpSLine } from "react-icons/ri";
import "./TraitFilter.css";
import { useEffect, useState } from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import StatusListItem from "../StatusListItem/StatusListItem";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import { AttributeV2 } from "../../types/rsv-types/collection-traits.types";
import RangeFilter from "../RangeFilter/RangeFilter";

type Props = {
  attribute: AttributeV2;
};

const TraitFilter = ({ attribute }: Props) => {
  const { selectedTraits, setSelectedTraits } = useHomeContext()!;

  const [showList, setShowlist] = useState(false);
  const traitValues = attribute.values!;
  const [traitValuesTemp, setTraitValuesTemp] = useState(traitValues);
  const [inputValue, setInputValue] = useState("");
  const [isRange, setIsRange] = useState(false);

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

  const selectTraitRange = (minTrait: string, maxTrait: string) => {
    const currentTrait = selectedTraits.find(({ type }) => {
      return type == attribute.key;
    });
    if (!currentTrait) {
      setSelectedTraits([
        ...selectedTraits,
        { type: attribute.key, min: minTrait, max: maxTrait },
      ]);
    } else {
      selectedTraits.forEach((value) => {
        if (value.type == attribute.key) {
          value.min = minTrait;
          value.max = maxTrait;
        }
      });

      setSelectedTraits([...selectedTraits]);
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

  useEffect(() => {
    const kindValue = attribute?.kind;
    if (kindValue == "number") {
      setIsRange(true);
    }
  }, [attribute]);

  return (
    <div className="trait_filter">
      <button className="filter_trigger" onClick={() => setShowlist(!showList)}>
        {attribute.key}{" "}
        <RiArrowUpSLine
          className="status_down_arrow"
          aria-expanded={!showList}
          size={20}
        />
      </button>

      <div className="trait_container" aria-expanded={!showList}>
        {!isRange && (
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
              <IoClose
                size={20}
                className="input_closer"
                onClick={clearInput}
              />
            )}
          </div>
        )}
        <div>
          {isRange ? (
            <RangeFilter attData={attribute} handleClick={selectTraitRange} />
          ) : (
            traitValuesTemp?.map((value) => {
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
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TraitFilter;
