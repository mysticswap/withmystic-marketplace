import "./ItemsScreen.css";
import FiltersSidebar from "../FiltersSidebar/FiltersSidebar";
import CardsHolder from "../CardsHolder/CardsHolder";
import { useHomeContext } from "../../context/HomeContext/HomeContext";

const ItemsScreen = () => {
  const { showFilters } = useHomeContext()!;
  return (
    <div className="items_screen">
      {showFilters && <FiltersSidebar isForTraits={true} />}
      <CardsHolder />
    </div>
  );
};

export default ItemsScreen;
