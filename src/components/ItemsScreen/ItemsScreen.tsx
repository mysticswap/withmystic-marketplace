import "./ItemsScreen.css";
import FiltersSidebar from "../FiltersSidebar/FiltersSidebar";
import CardsHolder from "../CardsHolder/CardsHolder";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
// import CardsHolderOS from "../CardsHolder/CardsHolderOS";

const ItemsScreen = () => {
  const { showFilters } = useHomeContext()!;
  return (
    <div className="items_screen">
      {showFilters && <FiltersSidebar isForTraits={true} />}
      <CardsHolder />
      {/* <CardsHolderOS /> */}
    </div>
  );
};

export default ItemsScreen;
