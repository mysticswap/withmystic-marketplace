import "./FiltersSidebar.css";
import StatusFilters from "../StatusFilters/StatusFilters";
import NumericFilters from "../NumericFilters/NumericFilters";
import TraitFilter from "../TraitFilter/TraitFilter";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

const FiltersSidebar = () => {
  const { collectionAttributes } = useGlobalContext()!;

  return (
    <div className="filters_sidebar">
      <StatusFilters />
      <NumericFilters title="Price" />
      <NumericFilters title="Rarity Rank" />
      {collectionAttributes?.attributes?.map((attribute) => {
        return <TraitFilter key={attribute.key} attribute={attribute} />;
      })}
    </div>
  );
};

export default FiltersSidebar;
