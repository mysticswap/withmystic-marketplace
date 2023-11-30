import { API_KEY, HARDCODED_MYSTIC_PROD_KEY } from "../../config";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { getHostName } from "../../utils";
import "./SwapsPage.css";
import { MysticSdk } from "mystic-sdk-1";

const SwapsPage = () => {
  const { client } = useGlobalContext();
  const goldenCollections = client.collections.map((collection) => {
    return collection.address;
  });
  const accessToken = client.apiKey || API_KEY;
  const isPreview = getHostName().includes("netlify.app");

  return (
    <div className="styles_page">
      <MysticSdk
        token={isPreview ? HARDCODED_MYSTIC_PROD_KEY : accessToken}
        favouriteCollections={goldenCollections}
      />
    </div>
  );
};

export default SwapsPage;
