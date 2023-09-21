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
          <input type="text" placeholder="Search" />
          <IoSearchSharp size={20} color="gray" />
        </div>
        <div>
          {traitValues.map((value, index) => {
            return (
              <StatusListItem
                key={value}
                text={value}
                subtext={traitCount[index]}
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
