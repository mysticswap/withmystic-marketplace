import "./ItemsScreen.css";
import FiltersSidebar from "../FiltersSidebar/FiltersSidebar";
import CardsHolder from "../CardsHolder/CardsHolder";
import { useHomeContext } from "../../context/HomeContext";

const ItemsScreen = () => {
  const { showFilters } = useHomeContext()!;
  return (
    <div className="ms_mp_items_screen">
      {showFilters && <FiltersSidebar />}
      <CardsHolder />
    </div>
  );
};

export default ItemsScreen;
