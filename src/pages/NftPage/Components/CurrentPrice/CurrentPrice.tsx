import "./CurrentPrice.css";
import { SiOpensea } from "react-icons/si";

const CurrentPrice = () => {
  return (
    <div className="current_price">
      <p>Current Price</p>
      <p>
        4.56 ETH <span>($123)</span>
      </p>
      <p>
        <span>Listed on</span>
        <SiOpensea display="block" color="#3498db" size={20} />
      </p>
    </div>
  );
};

export default CurrentPrice;
