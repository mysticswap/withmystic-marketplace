import "./ItemsScreen.css";
import FiltersSidebar from "../FiltersSidebar/FiltersSidebar";
import CardsHolder from "../CardsHolder/CardsHolder";
import { useCollectionContext } from "../../context/CollectionContext/CollectionContext";

const ItemsScreen = () => {
  const { showFilters } = useCollectionContext()!;
  return (
    <div className="items_screen">
      {showFilters && <FiltersSidebar isForTraits={true} />}
      <CardsHolder />
    </div>
  );
};

export default ItemsScreen;
