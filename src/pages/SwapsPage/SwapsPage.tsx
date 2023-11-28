import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import "./SwapsPage.css";
import { MysticSdk } from "mystic-sdk-1";

const SwapsPage = () => {
  const { client } = useGlobalContext();
  const goldenCollections = client.collections.map((collection) => {
    return collection.address;
  });

  return (
    <div className="styles_page">
      <MysticSdk
        token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGQyMWQzMGUyMjkxNDdiNjY1ZGM3YSIsImlhdCI6MTY5MjIxMzcxNX0.2RZ8He93TUUMeW0t3aqpt5KxNlo1r1fjMNtaBYyP9rI"
        favouriteCollections={goldenCollections}
      />
    </div>
  );
};

export default SwapsPage;
