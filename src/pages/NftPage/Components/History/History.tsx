import "./History.css";
import { historyData } from "./history.data";
import { TbExternalLink } from "react-icons/tb";

const History = () => {
  return (
    <div className="history">
      <div className="history_table">
        <div className="history_table_head">
          <p>History</p>
          <p>Price</p>
          <p>From</p>
          <p>To</p>
          <p>Time</p>
        </div>
        <div>
          {historyData.map((item) => {
            return (
              <div key={item.id} className="history_row">
                <p>{item.activity}</p>
                <p>{item.price}</p>
                <p>{item.from}</p>
                <p>{item.to}</p>
                <p>
                  {item.time} <TbExternalLink display="block" />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
