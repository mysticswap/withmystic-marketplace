import React, { useState } from 'react';
import './StatusFilters.css';
import { RiArrowUpSLine } from 'react-icons/ri';
import StatusListItem from '../StatusListItem/StatusListItem';

const StatusFilters = () => {
  const [showList, setShowlist] = useState(false);
  return (
    <div className="ms_mp_status_container">
      <button
        className="ms_mp_filter_trigger"
        onClick={() => setShowlist(!showList)}
      >
        Status{' '}
        <RiArrowUpSLine
          className="ms_mp_status_down_arrow"
          aria-expanded={showList}
          size={20}
        />
      </button>
      <ul className="ms_mp_status_list" aria-expanded={showList}>
        <StatusListItem text="Buy now only" />
        <StatusListItem text="Local listings only" />
      </ul>
    </div>
  );
};

export default StatusFilters;
