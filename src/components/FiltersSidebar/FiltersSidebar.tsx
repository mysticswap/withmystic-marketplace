import "./FiltersSidebar.css";
import StatusFilters from "../StatusFilters/StatusFilters";
import NumericFilters from "../NumericFilters/NumericFilters";
import TraitFilter from "../TraitFilter/TraitFilter";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import ActivityFilters from "../ActivityFilters/ActivityFilters";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import { IoClose } from "react-icons/io5";
import CurrencyFilters from "../StatusFilters/CurrencyFilters";

type Props = { isForTraits: boolean };

const FiltersSidebar = ({ isForTraits }: Props) => {
  const { collectionAttributes, supportedTokens } = useGlobalContext();
  const { showMobileFilters, setShowMobileFilters } = useHomeContext()!;

  return (
    <div
      className={`filters_sidebar ${showMobileFilters ? "show_sidebar" : ""}`}
    >
      <div className="filters_header">
        <p>Filters</p>
        <IoClose
          display="block"
          size={25}
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        />
      </div>
      {isForTraits ? (
        <>
          <StatusFilters />

          {supportedTokens.length === 1 ? null : <CurrencyFilters />}
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
