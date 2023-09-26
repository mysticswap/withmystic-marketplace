import "./FiltersSidebar.css";
import StatusFilters from "../StatusFilters/StatusFilters";
import NumericFilters from "../NumericFilters/NumericFilters";
import TraitFilter from "../TraitFilter/TraitFilter";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

const FiltersSidebar = () => {
  const { collectionTraits } = useGlobalContext()!;
  const traitTypes = Object.keys(collectionTraits);

  return (
    <div className="filters_sidebar">
      <StatusFilters />
      <NumericFilters title="Price" />
      <NumericFilters title="Rarity Rank" />
      {traitTypes.map((type) => {
        return (
          <TraitFilter key={type} traits={collectionTraits} traitType={type} />
        );
      })}
    </div>
  );
};

export default FiltersSidebar;
