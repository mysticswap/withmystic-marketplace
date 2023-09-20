import { truncateAddress } from "../../../../utils";
import "./Offers.css";
import { offersData } from "./offers.data";

const Offers = () => {
  return (
    <div className="offers">
      <p className="offers_title">Offers</p>
      <div className="offers_table">
        <div className="offers_table_head">
          <p>Price</p>
          <p>Expires in</p>
          <p>By</p>
        </div>
        <div>
          {offersData.map((item) => {
            return (
              <div key={item.id} className="offers_table_item">
                <p>{item.price}</p>
                <p>{item.expiration}</p>
                <p>{truncateAddress(item.offerer, 5, "...")}</p>
              </div>
            );
          })}
        </div>
        <button className="more_offers_btn">Load More</button>
      </div>
    </div>
  );
};

export default Offers;
