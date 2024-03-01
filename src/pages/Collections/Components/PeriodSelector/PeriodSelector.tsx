import { useState } from "react";
import { periodSelectors } from "../../../../constants";
import './PeriodSelector.css'
export const PeriodSelector = () => {
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);
  return (
    <div className="period-selector-wrapper">
      <div className="period-selector-container">
        {periodSelectors.map((period, index) => {
          const isPeriodSelected = selectedPeriodIndex === index;
          return (
            <span
              className={`period-selector-item ${isPeriodSelected ? "period-selected": "period-not-selected"}`}
              onClick={()=> setSelectedPeriodIndex(index)}
            >
              {period}
            </span>
          );
        })}
      </div>
    </div>
  );
};
