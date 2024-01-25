import { API_KEY } from "../../config";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
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

  return (
    <div className="styles_page">
      {/* SDK component that allow make swaps between nfts */}
      <MysticSdk
        token={accessToken}
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
