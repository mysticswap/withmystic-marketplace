import { API_KEY } from "../../config";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import "./SwapsPage.css";
import { MysticSdk } from "mystic-sdk-1";

const SwapsPage = () => {
  const { client } = useGlobalContext();
  const goldenCollections = client.collections.map((collection) => {
    return collection.address;
  });
  const accessToken = client.apiKey || API_KEY;

  return (
    <div className="styles_page">
      <MysticSdk token={accessToken} favouriteCollections={goldenCollections} />
    </div>
  );
};

export default SwapsPage;
