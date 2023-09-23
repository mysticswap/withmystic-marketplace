import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import "./ActivityScreen.css";

const ActivityScreen = () => {
  const { collectionHistory } = useGlobalContext()!;
  const [sales, setSales] = useState(collectionHistory.nftSales);

  return (
    <div>
      <div className="sales_table_head">
        <div></div>
        <div>Item</div>
        <div>Price</div>
        <div>From</div>
        <div>To</div>
        <div>Time</div>
      </div>
    </div>
  );
};

export default ActivityScreen;
