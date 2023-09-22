import { RiArrowUpSLine } from "react-icons/ri";
import "./TraitFilter.css";
import { useState } from "react";
import { TraitData } from "../FiltersSidebar/mocktraits";
import { IoSearchSharp } from "react-icons/io5";
import StatusListItem from "../StatusListItem/StatusListItem";
import { useHomeContext } from "../../context/HomeContext";

type Props = {
  traits: TraitData;
  traitType: string;
};

const TraitFilter = ({ traits, traitType }: Props) => {
  const { selectedTraits, setSelectedTraits } = useHomeContext()!;
  const [showList, setShowlist] = useState(false);
  const traitValues = Object.keys(traits.summary[traitType]);
  const traitCount = Object.values(traits.summary[traitType]);
  const [traitValuesTemp, setTraitValuesTemp] = useState(traitValues);
  const [traitCountTemp, setTraitCountTemp] = useState(traitCount);

  const selectTrait = (isClicked: boolean, trait: string) => {
    if (!isClicked) {
      setSelectedTraits([...selectedTraits, trait]);
    } else {
      const updatedSelection = selectedTraits.filter((item) => {
        return item !== trait;
      });
      setSelectedTraits(updatedSelection);
    }
  };

  const onSearch = (text: string) => {
    const query = text.toLowerCase();
    const searchResults = traitValues.filter((value) => {
      return value.toLowerCase().includes(query);
    });

    const traitTypes = traits.summary[traitType];
    const updatedCounts = searchResults.map((item) => {
      return traitTypes[item];
    });

    setTraitValuesTemp(searchResults);
    setTraitCountTemp(updatedCounts);
  };

  return (
    <div className="trait_filter">
      <button className="filter_trigger" onClick={() => setShowlist(!showList)}>
        {traitType}{" "}
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
          />
          <IoSearchSharp size={20} color="gray" />
        </div>
        <div>
          {traitValuesTemp.map((value, index) => {
            return (
              <StatusListItem
                key={value}
                text={value}
                subtext={traitCountTemp[index]}
                handleClick={selectTrait}
                isForTraits={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TraitFilter;
