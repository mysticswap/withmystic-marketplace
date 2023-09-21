import "./FiltersSidebar.css";
import StatusFilters from "../StatusFilters/StatusFilters";
import NumericFilters from "../NumericFilters/NumericFilters";
import { mockTraits } from "./mocktraits";
import { useState } from "react";
import TraitFilter from "../TraitFilter/TraitFilter";

const FiltersSidebar = () => {
  const [traits] = useState(mockTraits);
  const traitTypes = Object.keys(traits.summary);

  return (
    <div className="filters_sidebar">
      <StatusFilters />
      <NumericFilters title="Price" />
      <NumericFilters title="Rarity Rank" />
      {traitTypes.map((type) => {
        return <TraitFilter key={type} traits={traits} traitType={type} />;
      })}
    </div>
  );
};

export default FiltersSidebar;
