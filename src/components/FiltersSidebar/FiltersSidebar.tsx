import React from 'react';
import './FiltersSidebar.css';
import StatusFilters from '../StatusFilters/StatusFilters';
import NumericFilters from '../NumericFilters/NumericFilters';

const FiltersSidebar = () => {
  return (
    <div className="ms_mp_filters_sidebar">
      <StatusFilters />
      <NumericFilters title="Price" />
      <NumericFilters title="Rarity Rank" />
    </div>
  );
};

export default FiltersSidebar;
