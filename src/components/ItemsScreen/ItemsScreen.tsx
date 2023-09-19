import React from 'react';
import './ItemsScreen.css';
import FiltersSidebar from '../FiltersSidebar/FiltersSidebar';
import CardsHolder from '../CardsHolder/CardsHolder';
import { useGlobalContext } from '../../context/GlobalContext';

const ItemsScreen = () => {
  const { showFilters } = useGlobalContext()!;
  return (
    <div className="ms_mp_items_screen">
      {showFilters && <FiltersSidebar />}
      <CardsHolder />
    </div>
  );
};

export default ItemsScreen;
