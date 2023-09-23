import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import "./ActivityScreen.css";
import ActivityRow from "../ActivityRow/ActivityRow";

const ActivityScreen = () => {
  const { collectionHistory } = useGlobalContext()!;
  const [sales, setSales] = useState(collectionHistory.nftSales);

  useEffect(() => {
    setSales(collectionHistory.nftSales);
  }, [collectionHistory]);

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
      {sales.map((sale, index) => {
        return <ActivityRow key={sale.blockNumber * index} activity={sale} />;
      })}
    </div>
  );
};

export default ActivityScreen;
