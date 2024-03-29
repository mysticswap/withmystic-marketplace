import { API_KEY, HARDCODED_MYSTIC_PROD_KEY } from "../../config";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { getHostName } from "../../utils";
import "./SwapsPage.css";
import { MysticSdk } from "mystic-sdk-1";

const SwapsPage = () => {
  const { client, collectionChainId } = useGlobalContext();
  const { user, setUser, provider, setProvider, chainId } =
    useConnectionContext()!;
  const goldenCollections = client.collections.map((collection) => {
    return collection.address;
  });
  const accessToken = client.apiKey || API_KEY;
  const isPreview =
    getHostName()?.includes("netlify.app") ||
    getHostName()?.includes("localhost");

  return (
    <div className="styles_page">
      <MysticSdk
        token={isPreview ? HARDCODED_MYSTIC_PROD_KEY : accessToken}
        favouriteCollections={goldenCollections}
        hostUser={user}
        setHostUser={setUser}
        hostProvider={provider}
        setHostProvider={setProvider}
        supportedChain={collectionChainId}
        hostUserChain={chainId}
      />
    </div>
  );
};

export default SwapsPage;
