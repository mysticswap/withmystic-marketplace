import { API_KEY } from "../../config";
import { marketPlaceCollections } from "../../constants/hard-coded-collections";
import "./SwapsPage.css";
import { MysticSdk } from "mystic-sdk-1";

const SwapsPage = () => {
  const goldenCollections = marketPlaceCollections.map((collection) => {
    return collection.address;
  });

  return (
    <div className="styles_page">
      <MysticSdk token={API_KEY} favouriteCollections={goldenCollections} />
    </div>
  );
};

export default SwapsPage;
