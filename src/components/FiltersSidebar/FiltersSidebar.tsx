import "./FiltersSidebar.css";
import StatusFilters from "../StatusFilters/StatusFilters";
import NumericFilters from "../NumericFilters/NumericFilters";
import TraitFilter from "../TraitFilter/TraitFilter";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import ActivityFilters from "../ActivityFilters/ActivityFilters";

type Props = { isForTraits: boolean };

const FiltersSidebar = ({ isForTraits }: Props) => {
  const { collectionAttributes } = useGlobalContext()!;

  return (
    <div className="filters_sidebar">
      {isForTraits ? (
        <>
          <StatusFilters />
          <NumericFilters title="Price" isRarity={false} />
          <NumericFilters title="Rarity Rank" isRarity={true} />
          {collectionAttributes?.attributes?.map((attribute) => {
            return <TraitFilter key={attribute.key} attribute={attribute} />;
          })}
        </>
      ) : (
        <ActivityFilters />
      )}
    </div>
  );
};

export default FiltersSidebar;
