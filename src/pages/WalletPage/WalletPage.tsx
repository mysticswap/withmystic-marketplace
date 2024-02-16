// import CardsHolder from "../../components/CardsHolder/CardsHolder";
// import WalletFiltersSidebar from "../../components/FiltersSidebar/WalletFiltersSidebar";
import { useState } from "react";
import WalletFiltersSidebar from "../../components/FiltersSidebar/WalletFiltersSidebar";
import { useWalletContext } from "../../context/WalletContext/WalletContext";
import WalletControlBar from "../../components/ControlBar/WalletControlBar";
// import ActivityFilters from "../../components/ActivityFilters/ActivityFilters";
// import NumericFilters from "../../components/NumericFilters/NumericFilters";
import GenericRangeFilter from "../../components/NumericFilters/GenericRangeFilter";
import "./WalletPage.css";

// TODO
// 1. Load data from backend
// 2. Control which fields appear on the filters side bar
// 3. Avoid duplicating the types from HomeContextProvider
// 3.1 When I tried to create a WalletContext, the components that used the
//     homeContext stopped working. Maybe we should find a way to separate
//     the rendering and behavioural logics

const WalletPage = () => {
  const { showFilters, tokenId, selectedDropdownOption } = useWalletContext()!;

  const [ minValue, setMinValue ] = useState<number | null>(0)
  const [ maxValue, setMaxValue ] = useState<number | null>(110)

  return (
    <div className="styles_page">
      <h1>Wallet page!!!</h1>
      <ul>
        <li>showFilters: {showFilters ? "True" : "False"}</li>
        <li>tokenId: {tokenId}</li>
        <li>Order by: {selectedDropdownOption.title} </li>
        <li>Price Range: {minValue} - {maxValue}</li>
      </ul>
      <WalletControlBar />
      <div className="items_screen">
        {showFilters && (
          <WalletFiltersSidebar>
            <GenericRangeFilter title="Price" {...{minValue, setMinValue, maxValue, setMaxValue}} />
          </WalletFiltersSidebar>
        )}
        {/* <CardsHolder /> */}
      </div>
    </div>
  );
};

export default WalletPage;
